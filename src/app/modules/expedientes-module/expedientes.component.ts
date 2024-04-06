import { Component, OnInit } from '@angular/core';
import { Estado, Expedientes } from '../../models/expedientes.model';
import { ExpedientesService } from '../../services/expedientes.service';
import { TiposService } from '../../services/tipos.service';
import { Tipos } from '../../models/tipos.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ExpedientesModule',
  templateUrl: './formulario-expedientes.component.html',
  styleUrls: ['./expedientes.component.css']
})
export class ExpedientesComponent implements OnInit {

  expedienteForm: FormGroup = new FormGroup({});

  expedientes: Expedientes[] = []
  tipos: Tipos[] = []
  mensaje: string = ""
  codigo: string = ""
  responsable: string = ""
  fecha: string =  ""
  estado: Estado = Estado.Pendiente
  opciones: string = "";
  descripcion: string = ""
  tipoId: string = ""

  estados: Estado[] = [
    Estado.Pendiente,
    Estado.Erroneo,
    Estado.Enviado
  ];
 
  

  constructor(private servicio: ExpedientesService, private servicioTipos: TiposService, private formBuilder: FormBuilder) {}

  cargarExpedientes(codigo?: string, responsable?: string, fecha?: string, estado?:Estado, opciones?:string, descripcion?:string, tipoId?:string): void {
    this.servicio.consultarExpedientes(codigo, responsable, fecha, estado, opciones, descripcion, tipoId).subscribe(datos => {
      this.expedientes = datos;
    });
  }

  insertarExpediente(): void {
    if (this.expedienteForm.invalid) {
      this.mensaje = "Error en la inserción";
      return;
    }
    
    const formData = this.expedienteForm.value;
    formData.opciones = this.obtenerOpcionesSeleccionadas(); // Actualiza las opciones aquí
    formData.estado = this.expedienteForm.get('estado')?.value; // Agrega el valor del estado
  
    this.servicio.insertarExpediente(
      formData.codigo,
      formData.responsable,
      formData.fecha,
      formData.opciones,
      formData.descripcion,
      parseInt(formData.tipoId),
    ).subscribe(resultado => {
      if (resultado) {
        this.mensaje = "Expediente insertado";
        this.cargarExpedientes();
      }
    });
  }

  obtenerOpcionesSeleccionadas(): string {
    const urgenteSelected = this.expedienteForm.get('urgente')?.value;
    const confidencialSelected = this.expedienteForm.get('confidencial')?.value;
  
    if (urgenteSelected && confidencialSelected) {
      return 'Urgente, Confidencial';
    } else if (urgenteSelected) {
      return 'Urgente';
    } else if (confidencialSelected) {
      return 'Confidencial';
    } else {
      return '';
    }
  }

 

  expedienteParaActualizar: Expedientes | null = null;

  actualizarExpediente(): void {
    if (!this.expedienteParaActualizar) {
      this.mensaje = "Error: El expediente para actualizar es null";
      return;
    }
  
    if (this.expedienteForm.invalid) {
      this.mensaje = "Error en la actualización";
      return;
    }
  
    const formData = this.expedienteForm.value;
    this.servicio.actualizarExpediente(
      this.expedienteParaActualizar.id,
      formData.codigo,
      formData.responsable,
      formData.fecha,
      formData.estado,
      formData.opciones,
      formData.descripcion,
      formData.tipoId
    ).subscribe(resultado => {
      if (resultado) {
        this.mensaje = "Expediente actualizado";
        this.expedienteParaActualizar = null;
        this.expedienteForm.reset(); // Restablecer el formulario
        this.cargarExpedientes();
      }
    });
  }

  prepararActualizacion(expediente: Expedientes): void {
    this.expedienteParaActualizar = expediente;
  
    this.expedienteForm.patchValue({
      codigo: expediente.codigo,
      responsable: expediente.responsable,
      fecha: expediente.fecha,
      opciones: expediente.opciones,
      descripcion: expediente.descripcion,
      tipoId: expediente.tipo.id.toString()
    });
  }
  cancelarActualizacion(): void {
    this.expedienteParaActualizar = null;
    this.expedienteForm.reset();
  }

  borrarExpediente(id:number): void {
    if (confirm("¿Estás seguro de querer borrar este expediente?")) {
      this.servicio.borrarExpediente(id).subscribe( () => {
        this.mensaje = "Expediente borrado"
        this.cargarExpedientes()
      })
    }
  }
  
  cargarTipos(): void {
    this.servicioTipos.consultarTipos().subscribe(datos => {
      this.tipos = datos
    })
  }

  onChangeTipo(event: any) {
    this.tipoId = event.target.value;
  }

  ngOnInit(): void {
    this.expedienteForm = this.formBuilder.group({
      codigo: ['', Validators.required],
      responsable: ['', Validators.required],
      fecha: ['', [Validators.required, Validators.pattern(/\d{4}-\d{2}-\d{2}/)]],
      estado: [Estado.Pendiente, Validators.required], 
      opciones: [''],
      descripcion: [''],
      tipoId: ['', Validators.required],
      urgente: [false], 
      confidencial: [false] 
    });
    this.cargarExpedientes()
    this.cargarTipos()
  }

  // Method to submit the form
  onSubmit() {
    if (this.expedienteForm.valid) {
      // Handle form submission
      if (this.expedienteParaActualizar) {
        this.actualizarExpediente();
      } else {
        this.insertarExpediente();
      }
    }
  }

}
