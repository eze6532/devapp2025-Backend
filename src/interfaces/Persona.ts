import Auto from './Auto';

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
export enum Genero{
    M="Masculino",
    F="Femenino",
    NBin="No-Binario: terreneitor el coche mas poderoso que ha existido",
    vacio=" ",
}
