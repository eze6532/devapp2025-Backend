import { Document, FilterQuery, UpdateQuery } from "mongoose";
import { MongoRepository } from "../repositories/Mongo.repository";
import { IService } from "./interface.service";


export class ServiceGenerico<D extends Document, Q extends FilterQuery<D>> implements IService<D> {
    constructor(protected repo: MongoRepository<D, Q>) {}

    findById(id: string) {
        return this.repo.findById(id);
    }

    add(data: Partial<D>) {
        return this.repo.add(data);
    }

    delete(id: string) {
        return this.repo.deleteById(id);
    }

    update(id: string, data: UpdateQuery<D>) {
        return this.repo.updateById(id, data);
    }

    findAll(filter?: Q, projection?: string) {
        return this.repo.findAll(filter, projection);
    }
}
