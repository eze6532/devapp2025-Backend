import { Auto } from "../../models/auto.model";
import { Genero } from "../../models/genero.model";

export interface PersonaPersonalizadaDto{
    id?: string,
    nombre?: string,
    apellido?: string,
    dni?: string,
    fechaDeNacimeneto?: Date,
    genero?:Genero,
    donante?: boolean,
    autos?: Auto[] | null
}