import { IRepository } from "./IRepository";
import { db } from '../db/firebase';
import { FieldValue } from 'firebase-admin/firestore';

export class FirebaseRepository<T> implements IRepository<T> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async findAll(filter?: Partial<T>, projection?: string): Promise<T[]> {
    let query: FirebaseFirestore.Query = db.collection(this.collectionName);

    if (filter) {
      
      for (const [campo, valor] of Object.entries(filter)) {
        if (valor !== undefined && valor !== null && valor !== '') {
          query = query.where(campo, '==', valor);
        }
      }
    }

    const snapshot = await query.get();

    const camposProyectados = projection ? projection.split(" ") : null;

    const results = snapshot.docs.map(doc => {
      const data = normalizeTimestamps(doc.data());
      const fullData = { id: doc.id, ...data };
      if (camposProyectados) {
    const resultadoFiltrado: any = { id: doc.id }; 

    for (const campo of camposProyectados) {
      if (campo !== "id" && fullData[campo] !== undefined) {
        resultadoFiltrado[campo] = fullData[campo];
      }
    }
    return resultadoFiltrado as T;
    } 
      return fullData as T;
    });

    return results;
  }


  async findById(id: string): Promise<T | null> {
    const doc = await db.collection(this.collectionName).doc(id).get();
    if (!doc.exists) return null;

    const data = normalizeTimestamps(doc.data());
    
    return { id: doc.id, ...data } as T;
  }


  async add(entity: Partial<T>): Promise<T> {
    const ref = db.collection(this.collectionName).doc();
    await ref.set(entity);
    const saved = await ref.get();
    return { id: ref.id, ...saved.data() } as T;
  }

  async deleteById(id: string): Promise<T | null> {
    const entity = await this.findById(id);
    await db.collection(this.collectionName).doc(id).delete();
    return entity;
  }

  async updateById(id: string, entity: Partial<T>): Promise<T | null> {
    await db.collection(this.collectionName).doc(id).update(entity);
    return this.findById(id);
  }

  async findOneByFields(fields: Partial<Record<keyof T, any>>): Promise<T | null> {
    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = db.collection(this.collectionName);
    for (const [key, value] of Object.entries(fields)) {
      query = query.where(key, '==', value);
    }
    const snapshot = await query.limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as T;
  }
  async agregarAutoArray(personaId: string, autoId: string): Promise<void> {
    const personaRef = db.collection(this.collectionName).doc(personaId);
    await personaRef.update({
      autos: FieldValue.arrayUnion(autoId)
    });
  }

  async quitarAutoArray(personaId: string, autoId: string): Promise<void> {
    const personaRef = db.collection(this.collectionName).doc(personaId);
    await personaRef.update({
      autos: FieldValue.arrayRemove(autoId)
    });
  }
}


function normalizeTimestamps(obj: any): any {
  const newObj: any = {};
  for (const key in obj) {
    const val = obj[key];
    if (val?.toDate && typeof val.toDate === 'function') {
      newObj[key] = val.toDate(); 
    } else if (typeof val === 'object' && val !== null) {
      newObj[key] = normalizeTimestamps(val); 
    } else {
      newObj[key] = val;
    }
  }
  return newObj;
}

