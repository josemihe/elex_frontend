import { Expedientes } from "./expedientes.model";

export interface Actuaciones {
  id: number;
  descripcion: string;
  finalizado: number;
  fecha: string;
  expediente: Expedientes; 
  eliminado: boolean;
}

 