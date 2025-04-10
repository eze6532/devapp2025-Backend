import { Persona, PersonaBasica } from "../models/persona.model";

export interface PersonaRepo{
    findAllPersons:[PersonaBasica],
    findAllPersonsWithAuto:[Persona],
    findPersonaById(id: string):Persona|null,
    addPerson(persona:Persona):void,
    deletePersona(id:string):void,
}
