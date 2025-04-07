// Por el momento aca voy a poner una lista de personas 
// en un futuro voy agregar metodos para poder pedir, editar, elimnar esa lista
// Y lugo voy a darle una forma mas real a un repositorio

import { actualizarAuto } from "../models/auto";
import { Genero } from "../models/genero";
import { Persona } from "../models/persona";
import { darId } from "../utilid/utilid";

import { autoDeCastor, autoDeLupita, autoDeLupitaII } from "./autoRepositori";



let personas: Persona[] = [];



let Alen:Persona = {
    id: darId(),
    nombre:'Alen',
    apellido:'Rojas',
    dni:'12.345.678',
    fechaDeNacimeneto:new Date('1930/03/27'),
    genero: Genero.M,
    donante: true,
    autos:[]
};
let Lupita:Persona = {
    id: darId(),
    nombre:'Lupa Maria',
    apellido:'Hernandes',
    dni:'12.345.679',
    fechaDeNacimeneto:new Date('1999/12/24'),
    genero: Genero.F,
    donante: true,
    autos:[autoDeLupita, autoDeLupitaII]
};

let Castor:Persona = {
    id: darId(),
    nombre:'Juan Castor 2',
    apellido:'Blanco Herrero',
    dni:'12.345.670',
    fechaDeNacimeneto:new Date('1702/05/30'),
    genero: Genero.M,
    donante: false,
    autos:[autoDeCastor]
};
personas=[Alen, Castor, Lupita];

export {personas};