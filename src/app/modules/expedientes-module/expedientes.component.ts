import { Component, OnInit } from '@angular/core';
import { Estado, Expedientes } from '../../models/expedientes.model';
import { ExpedientesService } from '../../services/expedientes.service';

@Component({
  selector: 'app-ExpedientesModule',
  templateUrl: './formulario-expedientes.component.html',
  styleUrls: ['./expedientes.component.css']
})
export class ExpedientesComponent implements OnInit {

  expedientes: Expedientes[] = []
  mensaje: string = ""

  codigo: string = ""
  responsable: string = ""
  fecha: Date = new Date()
  estado: Estado = Estado.Pendiente
  opciones: string = ""
  descripcion: string = ""
  tipoId: string = ""
 
  

  constructor(private servicio: ExpedientesService) {}


  cargarExpedientes(codigo?: string, responsable?: string, estado?:Estado, opciones?:string, descripcion?:string, tipoId?:string): void {
    this.servicio.consultarExpedientes(codigo, responsable, estado, opciones, descripcion, tipoId).subscribe(datos => {
      this.expedientes = datos;
    });
  }

  insertarExpediente(): void {
    if(this.tipoId = ""){
      this.mensaje = "Error en la inserción"
    } else{
      this.servicio.insertarExpediente(this.codigo, this.responsable, this.fecha, this.opciones, this.descripcion, parseInt(this.tipoId)).subscribe(resultado => {
        if(resultado) {
          this.mensaje = "Expediente insertado"
          this.cargarExpedientes()
        }
      })
    }
  }

  expedienteParaActualizar: Expedientes | null = null;

  actualizarExpediente():void {
    if (this.expedienteParaActualizar) {
      this.servicio.actualizarExpediente(this.expedienteParaActualizar.id, this.expedienteParaActualizar.codigo, this.expedienteParaActualizar.responsable, this.expedienteParaActualizar.fecha, this.expedienteParaActualizar.estado, this.expedienteParaActualizar.opciones, this.expedienteParaActualizar.descripcion, this.expedienteParaActualizar.tipo.id).subscribe(resultado => {
        if(resultado){
          this.mensaje = "Expediente actualizado"
          
          this.expedienteParaActualizar = null
          this.codigo = ""
          this. responsable = ""
          this.fecha = new Date()
          this.estado = Estado.Pendiente
          this.opciones = ""
          this.descripcion = ""
          this.tipoId = ""
          this.cargarExpedientes()
        }
      })
    }
  }

  prepararActualizacion(expediente: Expedientes): void {
    this.expedienteParaActualizar = expediente
    this.codigo = expediente.codigo
    this.responsable = expediente.responsable
    this.fecha = expediente.fecha
    this.opciones = expediente.opciones
    this.descripcion = expediente.descripcion
    this.tipoId = expediente.tipo.id.toString()
  }

  cancelarActualizacion():void {
    this.expedienteParaActualizar = null
    this.codigo = ""
    this. responsable = ""
    this.fecha = new Date()
    this.estado = Estado.Pendiente
    this.opciones = ""
    this.descripcion = ""
    this.tipoId = ""
  }

  borrarExpediente(id:number): void {
    if (confirm("¿Estás seguro de querer borrar este expediente?")) {
      this.servicio.borrarExpediente(id).subscribe( () => {
        this.mensaje = "Expediente borrado"
        this.cargarExpedientes()
      })
    }
  }

  ngOnInit(): void {
      this.cargarExpedientes()
  }

}
