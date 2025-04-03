import { autoDeCastor, autoDeLupita, autoDeLupitaII } from './Autos';
import { Persona, Genero } from './Persona';


let personas: Persona[] = [];

export const darId=(): string => {
    return Date.now().toString();
};

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
autoDeLupita.duenio=Lupita.id;
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
