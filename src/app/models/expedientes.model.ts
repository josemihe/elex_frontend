import { Tipos } from "./tipos.model";

export interface Expedientes {
    id: number;
    codigo: string;
    responsable: string;
    fecha: Date;
    estado: Estado;
    opciones: string;
    descripcion: string;
    tipo: Tipos; 
    eliminado: boolean; 
  }
  
  export enum Estado {
    Pendiente = 'Pendiente',
    EnCurso = 'En Curso',
    Finalizado = 'Finalizado'
  }