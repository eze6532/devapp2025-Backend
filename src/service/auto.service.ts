import { FilterQuery } from "mongoose";
import { AutoDocument } from "../db/auto.db";
import { MongoRepository } from "../repositories/Mongo.repository";
import { ServiceGenerico } from "./ServiceGenerico";
import { IService } from "./interface.service";


export class AutoService extends ServiceGenerico<AutoDocument, FilterQuery<AutoDocument>> implements IService<AutoDocument>{
    constructor(repo: MongoRepository<AutoDocument, FilterQuery<AutoDocument>>) {
        super(repo);
    }

    findAll(filter?: FilterQuery<AutoDocument>) {
        return this.repo.findAll(filter, "marca modelo anio patente");
    }

    findByDuenio(duenioId: string) {
        return this.repo.findAll({ duenioId });
    }

    async findByPatenteAndChasi(patente: string, numerodeChasis: string): Promise<boolean> {
        const auto = await this.repo.findOneByFields({ patente, numerodeChasis });
        return !!auto;
    }
}