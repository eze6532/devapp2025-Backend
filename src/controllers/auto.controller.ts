// Proximamente el Controllador de Auto...

import { Request, Response } from "express";
import { buscarAuto, eliminarAuto, listarAutos, listarAutosDelDuenio, registrarAuto, sonArgumentosCorrectos, sonDeTiposCorrectos } from "../service/auto.service";

// inicio del futuro controllador de Auto
//Listar todos los autos
const findAllAutos=(req: Request, res: Response)=>{
    const { idPersona } = req.query;
    if(!idPersona){
        res.status(200).json(listarAutos());
    }else{
        const autosDeIdPersona=listarAutosDelDuenio(idPersona as string);
        if(!autosDeIdPersona||autosDeIdPersona.length===0){
            res.status(200).json({
                mensaje:'Se encontro el dueño pero no tiene auto',
                dato:[]
            })
        }else{
            res.status(200).json({
                mensaje:'Se encontro el deuño y sus autos',
                dato:autosDeIdPersona
            })
        }
    }
}

//buscar un autos
const findAutoById=(req:Request,res:Response)=>{
    const { id }=req.params;
    const auto=buscarAuto(id);

    if(!auto){
        res.status(404).json("No se encontro el veiculo que buscas");
    }else{
        res.status(200).json(auto);
    }
}

//agregar un auto
const addAuto= ( req:Request, res: Response)=>{
    const datosAuto = req.body;
//sonArgumentosCorrectos(datosAuto)&&sonDeTiposCorrectos(datosAuto)
    if (false) {
        const autoCargado=registrarAuto(datosAuto);
        if(!autoCargado){
            res.status(404).json('No se encontro el dueño de este auto')
        }else{
            res.status(200).json({
                mensaje:'El auto se cargo correctamente',
                dato:autoCargado
            })
        }
    } else {
        res.status(400).json("Se introdujeron datos inválidos");
    }
}


//delet
const deleteAutoById=(req: Request, res: Response)=>{
    console.log(" metodo", req)
    const id = req.params.id;

    try{
        eliminarAuto(id);
        res.status(200).json(`El auto ${id} fue eliminado`)
    }catch( error ){
        if (error instanceof Error){
            res.status(404).json({
                mensaje:'El Auto no pudo ser encontrada',
                error:error.message
            })
        }else{
            res.json(`Error desconosido ${error}`)
        }
    
    }
}


export { findAllAutos, findAutoById, addAuto, deleteAutoById }
