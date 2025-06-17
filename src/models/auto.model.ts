import { Persona } from "./persona.model";

export interface Auto {
  id: string;
  marca: string;
  modelo: string;
  anio: number;
  patente: string;
  color?: string;
  numerodeChasis?: string;
  motor?: string;
  duenio?: string; 
}

