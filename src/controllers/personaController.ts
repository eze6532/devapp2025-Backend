import { json } from "body-parser";
import { personas } from "../db/datos.db";
import { buscarPersona, eliminarPersona, isArgumentosCorrectoPersona, listarPersonas, registrarPersona } from "../service/persona.service";
import { Request, Response } from "express"; 



//listar las personas
const findAllPersonas = async (req: Request, res: Response) => {
    const personasRegistradas = await listarPersonas();

    if (!personasRegistradas || personasRegistradas.length === 0) {
        res.status(404).json({ mensaje: "No se encontraron personas registradas" });
    } else {
        res.status(200).json({
            mensaje: "Personas registradas",
            datos: personasRegistradas
        });
    }
};
//listar las personas con sus autos
const findAllPersonasWithAutos = async (req: Request, res: Response) => {
    res.json(personas);
};

//busca y devuelva la persona por id
const findPersonaById = async (req: Request, res: Response) => {
     const { id }=req.params;
    const persona= buscarPersona(id);

    if(!persona){
        res.status(404).json("No se encontro la persona que buscas");
    }else{
        res.status(200).json(persona)
    }
};
//agrega una persona
const addPersona = async ( req: Request, res: Response) => {
    const datosPersona= req.body;
    if(isArgumentosCorrectoPersona(datosPersona)){
        const newPersosna=registrarPersona(datosPersona);
        res.status(200).json(newPersosna.id);
    }else{
        res.status(400).json('Se introdujieron datos incorrectos')
    }
    
};
//elimina una persona por id
const deletePersonaById = async (req: Request, res: Response) => {
    const  id :string= req.params.id;
    try{
        eliminarPersona(id);
        res.status(201).json({
            mesnaje: 'La persona se elimino correctamente'
        })
    }catch(error){
        if (error instanceof Error){
            res.status(404).json({
                mensaje:'La persona no pudo ser encontrada',
                error:error.message
            })
        }else{
            res.json(`Error desconosido ${error}`)
        }
    }
}
export { findAllPersonas, findAllPersonasWithAutos, findPersonaById, addPersona, deletePersonaById};