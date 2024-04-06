import { Tipos } from "./tipos.model";

export interface Expedientes {
    id: number;
    codigo: string;
    responsable: string;
    fecha: string;
    estado: Estado;
    opciones: string;
    descripcion: string;
    tipo: Tipos; 
    eliminado: boolean; 
  }
  
  export enum Estado {
    Pendiente = 'Pendiente',
    Erroneo = 'Erróneo',
    Enviado = 'Enviado',
  }