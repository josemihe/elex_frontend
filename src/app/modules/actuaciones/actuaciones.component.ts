import { Component, OnInit } from '@angular/core';
import { Expedientes } from '../../models/expedientes.model';
import { ActuacionesService } from '../../services/actuaciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actuaciones } from '../../models/actuaciones.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actuaciones',
  templateUrl: './actuaciones.component.html',
  styleUrls: ['./actuaciones.component.css']
})
export class ActuacionesComponent implements OnInit {

  actuacionForm: FormGroup = new FormGroup({})
  expediente: Expedientes[] = []

  mensaje: string = ""

  actuaciones: Actuaciones[] = []
  descripcion: string = ""
  finalizado: number = 0
  fecha: string = ""
  expedienteId?: number

  constructor(private servicio: ActuacionesService, private formBuilder: FormBuilder, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.actuacionForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      fecha: ['', [Validators.required, Validators.pattern(/\d{4}-\d{2}-\d{2}/)]],
      finalizado: [false],
      expedienteId: [''],
    })

    this.route.params.subscribe(params => {
      const expedienteId = params['id']
      // Asignar el valor al formulario actuacionForm
      this.actuacionForm.patchValue({
        expedienteId: expedienteId
      })
  
      // Call cargarActuaciones here, inside the subscription block
      if (expedienteId !== undefined) {
        this.cargarActuaciones(expedienteId)
      }
    })

    
  }

  cargarActuaciones(expedienteId: number): void {
    this.servicio.consultarActuaciones(expedienteId).subscribe(datos => {
      this.actuaciones = datos
    })
  }

  insertarActuacion(): void {
    if (this.actuacionForm.invalid) {
      this.mensaje = "Error en la inserción"
      return
    }
    
    const formData = this.actuacionForm.value;
  
    this.servicio.insertarActuacion(
      formData.descripcion,
      formData.fecha,
      formData.expedienteId,
    ).subscribe(resultado => {
      if (resultado) {
        this.expedienteId = formData.expedienteId
        this.mensaje = "Actuación insertada"
        if (this.expedienteId !== undefined) {
          this.cargarActuaciones(this.expedienteId)
        }
      }
    })
  }

  actuacionParaActualizar: Actuaciones | null = null;

  actualizarActuacion(): void {
    if (!this.actuacionParaActualizar) {
      this.mensaje = "Error: La actuación para actualizar es null"
      return
    }
  
    if (this.actuacionForm.invalid) {
      this.mensaje = "Error en la actualización"
      return
    }
  
    const formData = this.actuacionForm.value;
    const finalizado = formData.finalizado ? 1 : 0
    this.servicio.actualizarActuacion(
      this.actuacionParaActualizar.id,
      formData.descripcion,
      finalizado,
      formData.fecha,
      formData.expedienteId
    ).subscribe(resultado => {
      if (resultado) {
        this.mensaje = "Actuación actualizada"
        this.expedienteId = formData.expedienteId
        this.actuacionParaActualizar = null;
        this.actuacionForm.reset() // Restablecer el formulario
        if (this.expedienteId !== undefined) {
          this.cargarActuaciones(this.expedienteId)
        }
      }
    })
  }

  prepararActualizacion(actuacion: Actuaciones): void {
    this.actuacionParaActualizar = actuacion
  
    this.actuacionForm.patchValue({
      descripcion: actuacion.descripcion,
      finalizado: actuacion.finalizado,
      fecha: actuacion.fecha,
      expedienteId: actuacion.expediente.id
    })
  }

  cancelarActualizacion(): void {
    this.actuacionParaActualizar = null
    this.actuacionForm.reset()
  }

  borrarActuacion(id:number): void {
    if (confirm("¿Estás seguro de querer borrar esta actuación?")) {
      this.servicio.borrarActuacion(id).subscribe( () => {
        this.mensaje = "Actuación borrada"
        if(this.expedienteId !== undefined){
          this.cargarActuaciones(this.expedienteId)
        }
      })
    }
  }

}
