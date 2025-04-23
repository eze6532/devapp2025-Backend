import { Persona } from "../../models/persona.model";

export interface AutoPersonalizadoDto{
    id: string,
    marca?: string,
    modelo?: string,
    anio?: number,
    patente?: string,
    color?: string,
    numerodeChasis?: string,
    motor?: string,
    duenio?: Persona["id"],
}