export interface IService<D> {
  findById(id: string): Promise<D | null>;
  add(data: Partial<D>): Promise<D>;
  delete(id: string): Promise<D | null>;
  update(id: string, data: Partial<D>): Promise<D | null>;
  findAll(filter?: any): Promise<D[]>;
}