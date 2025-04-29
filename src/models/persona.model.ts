import { Auto } from "./auto.model";
import { Genero } from "./genero.model";

export interface Persona {
    id: string,
    nombre: string,
    apellido: string,
    dni: string,
    fechaDeNacimento: Date,
    genero:Genero,
    donante: boolean,
    autos: Auto["id"][], 
}
export type PersonaBasica = Pick<Persona, 'dni'|'apellido'|'nombre'>;