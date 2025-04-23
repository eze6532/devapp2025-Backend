import { Auto } from "./auto.model";
import { Genero } from "./genero.model";

export interface Persona {
    id: string,
    nombre: string,
    apellido: string,
    dni: string,
    fechaDeNacimeneto: Date,
    genero:Genero,
    donante: boolean,
    autos: Auto["id"] | null, //En un futuro voy a cambiarlo a Auto['id']
}
export type PersonaBasica = Pick<Persona, 'dni'|'apellido'|'nombre'>;