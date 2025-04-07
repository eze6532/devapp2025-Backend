import { Persona } from "./persona";

export interface Auto {
    id: string,
    marca: string,
    modelo: string,
    anio: number,
    patente: string,
    color: string,
    numerodeChasis: string,
    motor: string,
    duenio: Persona["id"],
}
const actualizarAuto= (auto: Auto ,cambios: Partial<Auto>): Auto => { 
    //creo una copia del objeto orijinal y agrega los cambios
    return {...auto, ...cambios };
};
export{ actualizarAuto}