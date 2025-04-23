export abstract class Repository<T1,T2, T3> {
    abstract getAll(): T1[];
    abstract getById(id: string): T1 | undefined;
    abstract getSummaryList(): T2[];
    abstract deleteById(id: string): void;
    abstract getCustomInfo(campos: (keyof T1)[]): T3[];
    abstract addEntity(entity: T1): string; 
    abstract getEntityFieldsById(id: string, campos: (keyof T1)[]): T3[];
  }