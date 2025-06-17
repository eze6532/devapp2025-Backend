export interface IRepository<T, F = Partial<T>, U = Partial<T>> {
  findAll(filter?: F, projection?: string): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  add(entity: Partial<T>): Promise<T>;
  deleteById(id: string): Promise<T | null>;
  updateById(id: string, entity: U): Promise<T | null>;
  findOneByFields(fields: F): Promise<T | null>;
  agregarAutoArray(personaId: string, autoId: string): Promise<void>;
  quitarAutoArray(personaId: string, autoId: string): Promise<void> 
}
