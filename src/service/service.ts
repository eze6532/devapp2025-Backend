abstract class Service<T,T2,T3>{
    abstract listarTodos(): T[];
    abstract obtenerPorId(id: string): T | undefined;
    abstract listarResumen(): T2[];
    abstract eliminarPorId(id: string): void;
    abstract listarConArgumentodPedidos(campos: (keyof T)[]): T3[];
    abstract esArgumentoCorrecto(tipo:T):boolean;
    abstract pushNewEntity(tipo:T):string;
} 