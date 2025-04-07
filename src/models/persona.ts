import { Auto } from "./auto";
import { Genero } from "./genero";

export interface Persona {
    id: string,
    nombre: string,
    apellido: string,
    dni: string,
    fechaDeNacimeneto: Date,
    genero:Genero,
    donante: boolean,
    autos: Auto[] | null,
}
