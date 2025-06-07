import { Document, model, Schema } from "mongoose";
import { Genero } from "../models/genero.model";
import { Persona } from "../models/persona.model";

const personaSchema = new Schema<PersonaDocument>({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, required: true },
  fechaDeNacimiento: { type: Date, required: true },
  genero: { type: String, enum: Object.values(Genero), required: true },
  donante: { type: Boolean, default: false },
  autos: [{ type: Schema.Types.ObjectId, ref: 'Auto' }]
});

export type PersonaDocument= Document & Persona;
export const PersonaModel = model<PersonaDocument>('Persona', personaSchema);