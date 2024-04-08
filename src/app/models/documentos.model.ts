import { Expedientes } from "./expedientes.model" 

export interface IDocumento {
    id: number
    tasa: number
    pagado: number
    expediente: Expedientes
    eliminado: number
    pdf_base64: string
}
