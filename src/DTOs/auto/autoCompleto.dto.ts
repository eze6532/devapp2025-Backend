import { Persona } from "../../models/persona.model";

export interface AutoCompletoDto{
    id: string,
    marca: string,
    modelo: string,
    anio: number,
    patente: string,
    color: string,
    numerodeChasis: string,
    motor: string,
    duenio: Persona["id"],
}