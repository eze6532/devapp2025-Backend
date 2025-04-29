let contador = 0;
export const darId=(): string => {
    return `${Date.now().toString()}-${contador++}`;
};
export const darIdPorPosicion=(posicion:number):string =>{
    return `${darId}-${posicion}`
}