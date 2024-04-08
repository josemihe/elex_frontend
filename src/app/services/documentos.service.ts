import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IDocumento } from '../models/documentos.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  private baseURL = `${environment.apiURL}/documentos` 

constructor(private http: HttpClient) { }

  consultarDocumentos(expedienteId: number) {
    let url = `${this.baseURL}/consultar`;

    if (expedienteId !== undefined) {
      url += `/${expedienteId}`
    }

    return this.http.get<IDocumento[]>(url)
  }

  insertarDocumento(tasa: number, expedienteId: number): Observable<IDocumento> {
    const url = `${this.baseURL}/insertar/${tasa}/${expedienteId}`

    return this.http.post<IDocumento>(url, {})
  }

  actualizarDocumento(id: number, tasa: number, pagado: number, expedienteId: number){
    const url = `${this.baseURL}/actualizar/${id}/${tasa}/${pagado}/${expedienteId}`
    return this.http.put<IDocumento>(url, {})
  }

  borrarDocumento(id:number): Observable<void> {
    const url = `${this.baseURL}/borrar/${id}`
    return this.http.put<void>(url, null)
  }

  actualizarPdf(pdf_base64: string, id: number): Observable<any> {
    console.log("metodo llamado")
    const url = `${this.baseURL}/PDF/${id}`;
    console.log(url)
    const base64 = pdf_base64
    return this.http.put<any>(url,{"base64":base64}
    )
    
  }
}
