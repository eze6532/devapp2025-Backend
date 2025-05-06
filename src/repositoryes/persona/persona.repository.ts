import { personas } from "../../db/datos.db";
import { PersonaPersonalizadaDto } from "../../DTOs/persona/personaPersonalizada.dto";
import { PersonaResumenDto } from "../../DTOs/persona/personaResumen.dto";
import { Persona } from "../../models/persona.model";
import { darId } from "../../utilid/utilid";
import { Repository } from "../repository";

export class PersonaRepository extends Repository< Persona, PersonaResumenDto, PersonaPersonalizadaDto >{
    getEntityFieldsById(id: string, campos: (keyof Persona)[]): PersonaPersonalizadaDto[] {
        throw new Error("Method not implemented.");
    }
    private personas: Persona[]= personas;
    
    public getAll(): Persona[]{
        return this.personas;
    };
    public getById(id: string): Persona | undefined{
        return this.personas.find(p=>p.id===id);
    };
    public getSummaryList(): PersonaResumenDto[]{
        return this.personas.map(persona => ({
                id: persona.id,
                dni: persona.dni,
                nombre: persona.nombre,
                apellido: persona.apellido
            }));
    };
    public deleteById(id: string): void{
        const index= this.personas.findIndex(p=> p.id===id);
        this.personas.splice(index,1);
    };
    public addEntity(persona: Persona): string {
        persona.id= darId();
        this.personas.push(persona);
        return persona.id;

    }
    public getCustomInfo(campos: (keyof Persona)[]): PersonaPersonalizadaDto[] {
        return this.personas.map(persona => {
            let info: any = {};
            campos.forEach(campo => {
                info[campo] = persona[campo];
            });
            return info as PersonaPersonalizadaDto;
        });
    }
}
