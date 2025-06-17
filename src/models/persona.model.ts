import { Genero } from './genero.model';

export interface Persona{
  id:string;
  nombre: string;
  apellido: string;
  dni: string;
  fechaDeNacimiento?: Date;
  genero?: Genero;
  donante?: boolean;
  autos?: string[];
}
