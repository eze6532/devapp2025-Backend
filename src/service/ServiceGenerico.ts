
import { IRepository } from "../repositories/IRepository";
import { IService } from "./interface.service";

export abstract class ServiceGenerico<T> implements IService<T> {
  protected constructor(protected repository: IRepository<T>) {}

  findAll(filter?: Partial<T>): Promise<T[]> {
    return this.repository.findAll(filter);
  }

  findById(id: string): Promise<T | null> {
    return this.repository.findById(id);
  }

  add(data: Partial<T>): Promise<T> {
    return this.repository.add(data);
  }

  update(id: string, data: Partial<T>): Promise<T | null> {
    return this.repository.updateById(id, data);
  }

  delete(id: string): Promise<T | null> {
    return this.repository.deleteById(id);
  }
}
