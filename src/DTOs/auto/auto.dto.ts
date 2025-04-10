import { Persona } from "../../models/persona.model";

export interface AutoDto{
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