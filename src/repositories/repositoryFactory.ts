
import { IRepository } from './IRepository';
import { FirebaseRepository } from './Firebase.repository';
import { InMemoryRepository } from './Memory.repository';
import { MongoRepository } from './Mongo.repository';
import { FilterQuery, Model } from 'mongoose';
import { Document } from 'mongoose';
import { conectarDB } from '../db/mongo';


type DBType = 'mongo' | 'firebase' | 'memoria';

export function repositoryFactory<T>(collectionName: string,mongoModel?: Model<T & Document>): IRepository<T, any, any> {
  const dbType: DBType = (process.env.DB as DBType);

  switch (dbType) {
    case 'firebase':
      return new FirebaseRepository<T>(collectionName);

    case 'memoria':
      return new InMemoryRepository<T & { id?: string }>();

    case 'mongo':
      if (!mongoModel) {
        throw new Error(`Modelo Mongoose requerido para base de datos Mongo`);
      }
      conectarDB();
      return new MongoRepository<T & Document, FilterQuery<T & Document>>(mongoModel);
  }
}

