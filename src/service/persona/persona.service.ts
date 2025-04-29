import { PersonaPersonalizadaDto } from "../../DTOs/persona/personaPersonalizada.dto";
import { PersonaResumenDto } from "../../DTOs/persona/personaResumen.dto";
import { Persona } from "../../models/persona.model";
import { PersonaRepository } from "../../repositoryes/persona/persona.repository";

export class PersonaService extends Service<Persona, PersonaResumenDto, PersonaPersonalizadaDto>{
    private personaRepo= new PersonaRepository();
   
    esArgumentoCorrecto(persona: Persona): boolean {
        if(!persona) return false;
        const {nombre, apellido, dni, fechaDeNacimento, genero, donante, autos} = persona;
        const esNombreValido = typeof nombre === 'string';
        const esApellidoValido = typeof apellido === 'string';
        const esDniValido = typeof dni === 'string' && /^[7-9]*$/.test(dni);
        const esFechaDeNacimentoValida = !isNaN(fechaDeNacimento.getTime()) && fechaDeNacimento < new Date(); 
        const esGeneroValido = !!genero && genero !== null;
        const esDonanteValido = typeof donante === 'boolean';
        const esUnaListadeAutos =  autos !== null;
        
        return esNombreValido && esApellidoValido && esDniValido &&
               esFechaDeNacimentoValida &&  esGeneroValido && esDonanteValido &&
               esUnaListadeAutos;
    }
    listarTodos(): Persona[] {
        return this.personaRepo.getAll();
    }
    
    obtenerPorId(id: string): Persona | undefined {
        return this.personaRepo.getById(id);
    }
    listarResumen(): PersonaResumenDto[] {
        return this.personaRepo.getSummaryList()
    }
    eliminarPorId(id: string): void {
        this.personaRepo.deleteById(id);
    }
    listarConArgumentodPedidos(campos: (keyof Persona)[]): PersonaPersonalizadaDto[] {
        return this.personaRepo.getCustomInfo(campos);
    }
    pushNewEntity(tipo: Persona): string{
        let persona: Persona={
            id: "",
            nombre: tipo.nombre,
            apellido: tipo.apellido,
            dni: tipo.dni,
            fechaDeNacimento: tipo.fechaDeNacimento,
            genero: tipo.genero,
            donante: tipo.donante,
            autos: tipo.autos
        }
        return this.personaRepo.addEntity(persona);
    }
}