import { Types } from 'mongoose';

export interface Auto {
  _id: string;
  marca: string;
  modelo: string;
  anio: number;
  patente: string;
  color: string;
  numerodeChasis: string;
  motor: string;
  duenio: Types.ObjectId; 
}

