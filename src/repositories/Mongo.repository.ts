import { Model, FilterQuery, Document, UpdateQuery } from 'mongoose';
import { IRepository } from './IRepository';

export class MongoRepository<T extends Document, Q extends FilterQuery<T>> implements IRepository<T, Q, UpdateQuery<T>>{
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async findAll(filter?: Q, projection?: string): Promise<T[]> {
        return this.model.find(filter || {}, projection).exec();
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async add(entity: Partial<T>): Promise<T> {
        const newEntity = new this.model(entity);
        return newEntity.save();
    }

    async deleteById(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    async updateById(id: string, entity: UpdateQuery<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, entity, { new: true }).exec();
    }
  
    async findOneByFields(fields: Partial<Record<keyof T, any>>): Promise<T | null> {
        return this.model.findOne(fields).exec();
    }
    async agregarAutoArray(personaId: string, autoId: string): Promise<void> {
        await this.model.findByIdAndUpdate(
            personaId,
            { $addToSet: { autos: autoId } },
            { new: true }
        ).exec();
    }

    async quitarAutoArray(personaId: string, autoId: string): Promise<void> {
        await this.model.findByIdAndUpdate(
            personaId,
            { $pull: { autos: autoId } },
            { new: true }
        ).exec();
    }

}
