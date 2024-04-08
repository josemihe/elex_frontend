import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expedientes } from '../../models/expedientes.model';
import { IDocumento } from '../../models/documentos.model';
import { DocumentosService } from '../../services/documentos.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

  documentoForm: FormGroup = new FormGroup({})
  expediente: Expedientes[] = []
  

  mensaje: string = ""

  documentos: IDocumento[] = []
  id: number = 0
  tasa: number = 0
  pagado: number = 0
  expedienteId?: number
  pdf_base64: string = ""

  constructor(private servicio: DocumentosService, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.documentoForm = this.formBuilder.group({
      tasa: ['', Validators.required],
      pagado: [false],
      expedienteId: [this.expedienteId, Validators.required],
      pdf_base64: [''],
      archivo: [null],
    })

    this.route.params.subscribe(params => {

      const expedienteId = params['id']

      this.documentoForm.patchValue({
        expedienteId: expedienteId,
      })
      if (expedienteId !== undefined) {
        this.expedienteId = expedienteId
        this.cargarDocumentos(expedienteId)
      }
    }) 
  }

  cargarDocumentos(expedienteId: number): void {
    this.servicio.consultarDocumentos(expedienteId).subscribe(datos => {
      this.documentos = datos
    })
  }

  insertarDocumento():void {
    if (this.documentoForm.invalid) {
      this.mensaje = "Error en la inserción"
      return
    }

    const formData = this.documentoForm.value;

    this.servicio.insertarDocumento(
      formData.tasa,
      formData.expedienteId
    ).subscribe((resultado) => {
      if (resultado) {
        this.id = resultado.id
        this.mensaje = "Actuación insertada"
        if (this.expedienteId !== undefined){
          this.guardarFicheroEnDocumento()
          this.cargarDocumentos(this.expedienteId)
        }
      }
    })
  }

  documentoParaActualizar: IDocumento | null = null;

  actualizarDocumento(): void {
    if (!this.documentoParaActualizar) {
      this.mensaje = "Error: El documento para actualizar es null"
      return
    }

    if (this.documentoForm.invalid) {
      this.mensaje = "Error en la actualización"
      return
    }

    const formData = this.documentoForm.value;
    const pagado = formData.pagado ? 1 : 0
    this.servicio.actualizarDocumento(
      this.documentoParaActualizar.id,
      formData.tasa,
      pagado,
      formData.expedienteId
    ).pipe (
      map((resultado) => resultado.id), // Extraer el ID del documento
      tap((documentoId) => {
        this.id = documentoId; // Asignar el ID a la variable
      })
    )
    .subscribe(resultado => {
      if (resultado) {
        this.mensaje = "Documento actualizado"
        this.expedienteId = formData.expedienteId
        this.documentoParaActualizar = null
        this.documentoForm.reset()
        if(this.expedienteId !== undefined) {
          this.guardarFicheroEnDocumento()
          this.cargarDocumentos(this.expedienteId)
        }
      }
    })
  }

  prepararActualizacion(documento: IDocumento): void {
    this.documentoParaActualizar = documento

    this.documentoForm.patchValue({
      tasa: documento.tasa,
      pagado: documento.pagado,
      pdf_base64: documento.pdf_base64,
      expedienteId: documento.expediente.id
    })
  }

  cancelarActualizacion(): void {
    this.documentoParaActualizar = null
    this.documentoForm.reset()
  }

  borrarDocumento(id:number): void {
    if (confirm("¿Estás seguro de querer borrar este documento?")) {
      this.servicio.borrarDocumento(id).subscribe( () => {
        this.mensaje = "Documento borrado"
        if(this.expedienteId !== undefined){
          this.cargarDocumentos(this.expedienteId)
        }
      })
    }
  }

  guardarFicheroEnDocumento() {
    this.servicio.actualizarPdf(this.pdf_base64, this.id).subscribe( () => {
      this.mensaje = "PDF insertado"
    })
}


  onFileSelected(event: any) {
    const file = event.target!.files[0];
    if(file) {
      const reader = new FileReader()
      reader.readAsDataURL(file);
      reader.onload = (evnt) => {
        const base64 = evnt.target!.result
        this.pdf_base64 = base64 as string
      }
    }
  }
}
