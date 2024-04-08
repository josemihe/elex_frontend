import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado, Expedientes } from '../models/expedientes.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExpedientesService {

  private baseURL = `${environment.apiURL}/expedientes`;

  constructor(private http: HttpClient) { }

  //Consultar Expedientes
  // @GetMapping("/consultar")
  /*consultarExpedientes(codigo?: string, responsable?: string, fecha?: string, estado?: Estado, opciones?: string, descripcion?: string, tipoId?: string): Observable<Expedientes[]> {

    const params: Record<string, string> = {}; // Cambiado el tipo de params

    // Solo agregamos los parámetros con valor
    if (codigo !== undefined) {
      params['codigo'] = codigo.toString() // Convertir a string
    }
    if (responsable !== undefined) {
      params['responsable'] = responsable.toString() // Convertir a string
    }
    if (fecha !== undefined) {
      params['fecha'] = fecha.toString() // Convertir a string
    }
    if (estado !== undefined) {
      params['estado'] = estado.toString() // Convertir a string
    }
    if (opciones !== undefined) {
      params['opciones'] = opciones.toString() // Convertir a string
    }
    if (descripcion !== undefined) {
      params['descripcion'] = descripcion.toString() // Convertir a string
    }
    if (tipoId !== undefined) {
      params['tipoId'] = tipoId.toString() // Convertir a string
    }

    // Construimos la URL con los parámetros
    const url = `${this.baseURL}/consultar?${new URLSearchParams(params).toString()}`

    // Enviamos la solicitud
    return this.http.get<Expedientes[]>(url)
  }*/

  // Insertar Expedientes
  // @PostMapping("/insertar/{codigo}/{responsable}/{fecha}/{opciones}/{descripcion}/{tipoId}")
  insertarExpediente(codigo: string, responsable: string, fecha: string, opciones: string, descripcion:string, tipoId: number): Observable<Expedientes> {
    const url = `${this.baseURL}/insertar/${codigo}/${responsable}/${fecha}/${opciones}/${descripcion}/${tipoId}`

    // Realizar la solicitud POST
    return this.http.post<Expedientes>(url, {})
  }

  consultarExpedientes(codigo?: string, responsable?: string, fecha?: string, estado?: string, opciones?: string, descripcion?: string, tipoId?: string): Observable<Expedientes[]> {
    let params = new HttpParams();

    if (codigo) {
      params = params.set('codigo', codigo);
    }
    if (responsable) {
      params = params.set('responsable', responsable);
    }
    if (fecha) {
      params = params.set('fecha', fecha);
    }
    if (estado) {
      params = params.set('estado', estado);
    }
    if (opciones) {
      params = params.set('opciones', opciones);
    }
    if (descripcion) {
      params = params.set('descripcion', descripcion);
    }
    if (tipoId) {
      params = params.set('tipoId', tipoId);
    }

    return this.http.get<Expedientes[]>(`${this.baseURL}/consultar`, { params });
  }


  //Actualizar Expedientes
  // @PutMapping("/actualizar/{id}/{codigo}/{responsable}/{fecha}/{estado}/{opciones}/{descripcion}/{tipoId}")
  actualizarExpediente(id: number, codigo: string, responsable: string, fecha: string, estado: Estado, opciones: string, descripcion: string, tipoId: number): Observable<Expedientes> {
    const estadoStr = estado.toString(); // Convertir el objeto estado a su representación de cadena adecuada
    const url = `${this.baseURL}/actualizar/${id}/${codigo}/${responsable}/${fecha}/${estadoStr}/${opciones}/${descripcion}/${tipoId}`
    return this.http.put<Expedientes>(url, {})
  }

  // Borrar Expediente
  // @PutMapping("/borrar/{id}")
  borrarExpediente(id: number): Observable<void> {
    const url = `${this.baseURL}/borrar/${id}`
    return this.http.put<void>(url, null)
  }
}
