import { Auto } from "../models/auto.model";

export interface PersonaRepo{
    findAllAuto:[Auto],
    findAutoById(id: string):Auto|null,
    addAuto(auto:Auto):void,
    deleteAuto(id:string):void,
}


