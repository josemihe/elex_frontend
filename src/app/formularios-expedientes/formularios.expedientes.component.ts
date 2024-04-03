import { Component, OnInit } from '@angular/core';

// Importaciones propias
import { ExpedientesService } from '../services/expedientes.service';
import { Expedientes } from '../models/expedientes.model';

ExpedientesService

@Component({
  selector: 'app-formularios.expedientes',
  templateUrl: './formularios.expedientes.component.html',
  styleUrls: ['./formularios.expedientes.component.css']
})

export class FormulariosExpedientesComponent implements OnInit{

  expedientes: Expedientes[] = []
  mensaje: string = ""

  codigo: string = ""
  responsable: string = ""
  fecha: Date = new Date()
  opciones: string = ""
  descripcion: string = ""
  tipoId?: number

  constructor(private servicio: ExpedientesService) {}


 

  insertarExpediente(): void {
    
  }

  ngOnInit(): void {
      // this.cargarExpedientes()
  }


}
