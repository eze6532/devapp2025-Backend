import { Auto } from "../../models/auto.model";
import { Genero } from "../../models/genero.model";

export interface PersonaCompletaDto{
    id: string,
    nombre: string,
    apellido: string,
    dni: string,
    fechaDeNacimeneto: Date,
    genero:Genero,
    donante: boolean,
    autos: Auto[] | null
}