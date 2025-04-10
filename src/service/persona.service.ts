import { personas } from "../db/datos.db";
import { Persona, PersonaBasica } from "../models/persona.model";
import { darId } from "../utilid/utilid";

// Todos estos metodos funciona para el caso en que los archivos se guerden en memoria, 
//debo mejorar el repositorio y mejorar la base de datos y no tratar las como arrays

const listarPersonas = ():PersonaBasica[]  =>{
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
        typeof persona.nombre=='string' ||
        typeof persona.apellido=='string' ||
        typeof persona.dni=='string' ||
        typeof persona.fechaDeNacimeneto=='string' ||
        typeof persona.genero== 'string' ||
        typeof persona.donante=='boolean' ||
        typeof persona.autos=='object' // no seria object despues lo reviso
    )
    
}
const registrarPersona=(newPersosna:Persona):Persona=>{
    return actualizarPersona(newPersosna, {id:darId()});
}
const eliminarPersona=(idPersona:string)=>{
    const index= personas.findIndex(p=> p.id===idPersona);
    personas.splice(index)
}
export { listarPersonas, actualizarPersona, buscarPersona, registrarPersona, isArgumentosCorrectoPersona, eliminarPersona };
