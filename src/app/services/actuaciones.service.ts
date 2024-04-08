import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Actuaciones } from '../models/actuaciones.model';

@Injectable({
  providedIn: 'root'
})

export class ActuacionesService {
  private baseURL = `${environment.apiURL}/actuaciones`

  constructor(private http: HttpClient) { }
  consultarActuaciones(expedienteId: number) {
    let url = `${this.baseURL}/consultar`
    
    if (expedienteId !== undefined) {
      url += `/${expedienteId}`
    }
    
    return this.http.get<Actuaciones[]>(url)
  }
  
  insertarActuacion(descripcion: string, fecha: string, expedienteId: number): Observable<Actuaciones> {
    const url = `${this.baseURL}/insertar/${descripcion}/${fecha}/${expedienteId}`

    // Realizar la solicitud POST
    return this.http.post<Actuaciones>(url, {})
  }

  actualizarActuacion(id: number, descripcion: string, finalizado: number, fecha: string, expedienteId: number): Observable<Actuaciones> {
    const url = `${this.baseURL}/actualizar/${id}/${descripcion}/${finalizado}/${fecha}/${expedienteId}`
    return this.http.put<Actuaciones>(url, {})
  }

  borrarActuacion(id: number): Observable<void> {
    const url = `${this.baseURL}/borrar/${id}`
    return this.http.put<void>(url, null)
  }
  
}