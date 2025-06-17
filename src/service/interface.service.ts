export interface IService<D, F = Partial<D>> {
  findById(id: string): Promise<D | null>;
  add(data: Partial<D>): Promise<D>;
  delete(id: string): Promise<D | null>;
  update(id: string, data: Partial<D>): Promise<D | null>;
  findAll(filter?: F): Promise<D[]>;
  agregarAutoArray?(personaId: string, autoId: string): Promise<void>;
  quitarAutoArray?(personaId: string, autoId: string): Promise<void>;
}