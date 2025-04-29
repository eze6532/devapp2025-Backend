import { Request, Response } from "express";
import { Controller } from "../controller";
import { AutoService } from "../../service/auto/auto.service";
import { PersonaService } from "../../service/persona/persona.service";

export class AutoController extends Controller{
    private autoSer= new AutoService;
    private personaSer= new PersonaService;

    findAll(req: Request, res: Response): void {
        const { idPersona } = req.query;
        
        if(!idPersona){
            const autosRegistradas = this.autoSer.listarTodos();
            if (this.autoSer.cheahearLista(autosRegistradas)) {
                res.status(404).json({ mensaje: "No se encontraron autos registrados" });
            } else {
                res.status(200).json({
                    mensaje: "Autos registradas",
                    datos: autosRegistradas
                });
            }
            
        }else{
            const autosdePersonaId= this.autoSer.listarAutosDelDuenio(idPersona as string);
            if(this.autoSer.cheahearLista(autosdePersonaId)){
                res.status(200).json({
                    mensaje:'Se encontro el dueño pero no tiene auto',
                    dato:[]
                })
            }else{
                res.status(200).json({
                    mensaje:'Se encontro el deuño y sus autos',
                    dato:autosdePersonaId
                })
            }

            
        }
    }
   
    findById(req: Request, res: Response): void {
        const { id } = req.params;
        const auto = this.autoSer.obtenerPorId(id);
    
        if (!auto) {
            res.status(404).json("No se encontró la auto que buscas");
        } else {
            res.status(200).json(auto);
        }
    }
    add(req: Request, res: Response): void {
        const autoDto = req.body;
            if (this.autoSer.esArgumentoCorrecto(autoDto)) {
                const idNewAuto=this.autoSer.pushNewEntity(autoDto);
                const findDuenioId= this.personaSer.obtenerPorId(idNewAuto)
                if(!findDuenioId){
                    res.status(404).json('No se encontro el dueño de este auto')
                }else{
                    res.status(200).json({
                        mensaje:'El auto se cargo correctamente',
                        dato:findDuenioId
                    })
                }
            } else {
                res.status(400).json("Se introdujeron datos inválidos");
            }
    }
    deleteById(req: Request, res: Response): void {
        const  id = req.params.id;
        try{
            //this.autoSer.eliminarPorId(id);
            res.status(201).json({
                mesnaje: 'El auto se elimino correctamente'
            })
        }catch(error){
            if (error instanceof Error){
                res.status(404).json({
                    mensaje:'El auto no pudo ser encontrada',
                    error:error.message
                })
            }else{
                res.json(`Error desconosido ${error}`)
            }
        }
    }

    findByDuenio= (req: Request, res: Response): void => {
        const { idPersona } = req.query;

        if (!idPersona) {
            res.status(400).json({ mensaje: "Falta el parámetro idPersona" });
        }

        const autosDeIdPersona = this.autoSer.listarAutosDelDuenio(idPersona as string);

        if (!autosDeIdPersona || autosDeIdPersona.length === 0) {
            res.status(200).json({
                mensaje: 'Se encontró el dueño pero no tiene autos',
                dato: []
            });
        } else {
            res.status(200).json({
                mensaje: 'Se encontró el dueño y sus autos',
                dato: autosDeIdPersona
            });
        }
    }
}