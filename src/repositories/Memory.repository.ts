import { v4 as uuidv4 } from 'uuid';
import { IRepository } from './IRepository';

export class InMemoryRepository<T extends { id?: string }> implements IRepository<T> {
  private store = new Map<string, T>();

  async findAll(filter?: Partial<T>, projection?: string): Promise<T[]> {
  let results = Array.from(this.store.values());

  if (filter) {
    results = results.filter(item =>
      Object.entries(filter).every(([key, value]) =>
        item[key as keyof T] === value
      )
    );
  }

  if (projection) {
    const keys = projection.split(/\s+/);
    results = results.map(item => {
      const projected: Partial<T> = {};
      for (const key of keys) {
        if (key in item) {
          projected[key as keyof T] = item[key as keyof T];
        }
      }
   
      if (item.id) {
        projected.id = item.id;
      }
      return projected as T;
    });
  }

  return results;
}


  async findById(id: string): Promise<T | null> {
    return this.store.get(id) || null;
  }

  async add(entity: Partial<T>): Promise<T> {
    const id = uuidv4();
    const fullEntity = { ...entity, id } as T;
    this.store.set(id, fullEntity);
    return fullEntity;
  }

  async deleteById(id: string): Promise<T | null> {
    const entity = this.store.get(id);
    this.store.delete(id);
    return entity || null;
  }

  async updateById(id: string, entity: Partial<T>): Promise<T | null> {
    const existing = this.store.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...entity } as T;
    this.store.set(id, updated);
    return updated;
  }

  async findOneByFields(fields: Partial<Record<keyof T, any>>): Promise<T | null> {
    for (const item of Array.from(this.store.values())) {
      if (Object.entries(fields).every(([key, value]) => item[key as keyof T] === value)) {
        return item;
      }
    }
    return null;
  }
  async agregarAutoArray(personaId: string, autoId: string): Promise<void> {
    const persona = this.store.get(personaId);
    if (!persona) {
      throw new Error("Persona no encontrada");
    }

    if (!('autos' in persona) || !Array.isArray((persona as any).autos)) {
      (persona as any).autos = [];
    }

    if (!(persona as any).autos.includes(autoId)) {
      (persona as any).autos.push(autoId);
    }

    this.store.set(personaId, persona);
  }
  async quitarAutoArray(personaId: string, autoId: string): Promise<void> {
    const persona = this.store.get(personaId);
    if (!persona) throw new Error('Persona no encontrada');

    if (Array.isArray((persona as any).autos)) {
      (persona as any).autos = (persona as any).autos.filter((id: string) => id !== autoId);
      this.store.set(personaId, persona);
    }
  }
}
