import { FilterQuery } from "mongoose";
import { PersonaDocument } from "../db/persona.db";
import { MongoRepository } from "../repositories/Mongo.repository";
import { ServiceGenerico } from "./ServiceGenerico";
import { IService } from "./interface.service";

export class PersonaService extends ServiceGenerico<PersonaDocument, FilterQuery<PersonaDocument>> implements IService<PersonaDocument> {
    constructor(repo: MongoRepository<PersonaDocument, FilterQuery<PersonaDocument>>) {
        super(repo);
    }

    findAll() {
        return this.repo.findAll({}, "dni apellido nombre");
    }
    findByDni(dni: string): Promise<PersonaDocument | null>{
        return this.repo.findOneByFields({ dni });
    }

}