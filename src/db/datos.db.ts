import { Auto } from "../models/auto.model";
import { Genero } from "../models/genero.model";
import { Persona } from "../models/persona.model";
import { darId } from "../utilid/utilid";





let autos: Auto[] = [];


export let autoDeLupita: Auto = {
    id: darId(),
    marca:'Fotorama',
    modelo:'Terrenator',
    anio:2012,
    patente:'AF 456 RF',
    color: 'Verde mate con lineas negras',
    numerodeChasis: 'BF-55-5544',
    motor: '5V',
    duenio: '',
};
export let autoDeCastor: Auto = {
    id: darId(),
    marca:'Fotorama',
    modelo:'Terrenator',
    anio:2012,
    patente:'AF 456 RF',
    color: 'Verde mate con lineas negras',
    numerodeChasis: 'BF-55-5544',
    motor: '5V',
    duenio: '',
};
export let autoDeLupitaII: Auto = {
    id: darId(),
    marca:'Fotorama',
    modelo:'Terrenator',
    anio:2012,
    patente:'AF 456 RF',
    color: 'Verde mate con lineas negras',
    numerodeChasis: 'BF-55-5544',
    motor: '5V',
    duenio: '',
};

autos=[autoDeLupita, autoDeLupitaII, autoDeCastor]





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
autoDeLupita.duenio = Lupita.id;
autoDeLupitaII.duenio = Lupita.id;
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
autoDeCastor.duenio = Castor.id;
personas=[Alen, Castor, Lupita];

export {personas, autos};