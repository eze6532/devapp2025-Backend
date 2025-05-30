import { Document, model, Schema } from "mongoose";
import { Auto } from "../models/auto.model";

const autoSchema = new Schema<AutoDocument>({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  anio: { type: Number, required: true },
  patente: { type: String, required: true },
  color: { type: String, required: true },
  numerodeChasis: { type: String, required: true },
  motor: { type: String, required: true },
  duenio: { type: Schema.Types.ObjectId, ref: 'Persona', required: true }
});

export type AutoDocument = Auto & Document;
export const AutoModel = model<AutoDocument>('Auto', autoSchema);