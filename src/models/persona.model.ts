import { Types } from 'mongoose';
import { Genero } from './genero.model';

export interface Persona{
  _id:string;
  nombre: string;
  apellido: string;
  dni: string;
  fechaDeNacimiento: Date;
  genero: Genero;
  donante: boolean;
  autos: Types.ObjectId[];
}
