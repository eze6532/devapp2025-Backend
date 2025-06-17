import { Genero } from "../models/genero.model";
import { Persona } from "../models/persona.model";

export interface PersonaDto{
    id?: string,
    nombre?: string,
    apellido?: string,
    dni?: string,
    fechaDeNacimiento?: string,
    genero?:Genero,
    donante?: boolean,
    autos? :string[];
}


export function personaToDto(persona: Persona): PersonaDto {

  const fecha = persona.fechaDeNacimiento;
  return {
    id: persona.id.toString(),
    nombre: persona.nombre,
    apellido: persona.apellido,
    dni: persona.dni,
    fechaDeNacimiento:fecha instanceof Date
      ? fecha.toISOString().split('T')[0]
      : typeof fecha === 'string'
        ? fecha
        : undefined,
    genero: persona.genero,
    donante: persona.donante,
    autos:persona.autos,
  
  }
}
export function dtoToPersona(dto: PersonaDto): Persona {
    if (!dto.nombre || !dto.apellido || !dto.dni || !dto.fechaDeNacimiento || !dto.genero || dto.donante === undefined) {
        throw new Error("Faltan campos obligatorios en PersonaDto");
    }
    const persona: Partial<Persona> = {
        nombre: dto.nombre,
        apellido: dto.apellido,
        dni: dto.dni,
        fechaDeNacimiento: new Date(dto.fechaDeNacimiento),
        genero: dto.genero,
        donante: dto.donante,
        autos: dto.autos?.map(id => id as any) || [] 
    };
    if (dto.id?.trim()) {
    persona.id = dto.id;
  }

    return persona as Persona;
}
