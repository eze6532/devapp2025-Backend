import { Persona } from "../models/persona";
import {  personas } from "../repositories/personaRepositori";
import { darId } from "../utilid/utilid";

interface InformacionBasicaPersona{
    id: string,
    dni: string,
    nombre: string,
    apellido: string
}

const listarPersonas = ():InformacionBasicaPersona[]  =>{
    return personas.map(persona => ({
        id: persona.id,
        dni: persona.dni,
        nombre: persona.nombre,
        apellido: persona.apellido
    }));
}
const actualizarPersona= (persona: Persona ,cambios: Partial<Persona>): Persona => { 
    //creo una copia del objeto orijinal y agrega los cambios
    return {...persona, ...cambios };
};
const buscarPersona=(idPersona: string): Persona|undefined=>{
    //busca una persona por el id, y si no existe devuelde indefinido
    return personas.find(p=>idPersona===p.id);
}
const isArgumentosCorrectoPersona=(persona:Persona):boolean=>{
    return(
        typeof persona.nombre=='string' &&
        typeof persona.apellido=='string' &&
        typeof persona.dni=='string' &&
        typeof persona.fechaDeNacimeneto=='string' &&
        typeof persona.genero== 'string' &&
        typeof persona.donante=='boolean' &&
        typeof persona.autos=='object' // no seria object despues lo reviso
    )
    
}
const registrarPersona=(newPersosna:Persona):Persona=>{
    return actualizarPersona(newPersosna, {id:darId()});
}
export { listarPersonas, actualizarPersona, buscarPersona, registrarPersona, isArgumentosCorrectoPersona };
