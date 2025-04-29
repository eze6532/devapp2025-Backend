import { Request, Response } from "express";
import { Controller } from "../controller";
import { PersonaService } from "../../service/persona/persona.service";


export class PersonaController extends Controller{
    
    private personaSer= new PersonaService;
    //devuelve la informacion completa de la persona
    findAll(req: Request, res: Response): void {
       const personasRegistradas = this.personaSer.listarTodos();
       this.manejarRespuestaPersonas(personasRegistradas, res);
    }
    findAllSummary(req: Request, res: Response):void{
        const personasRegistradas = this.personaSer.listarResumen();
        this.manejarRespuestaPersonas(personasRegistradas, res);
    }
    findAllCustomInfo(req: Request, res: Response):void{
        const campos = req.body;
        try {
            const personasRegistradas = this.personaSer.listarConArgumentodPedidos(campos);
            this.manejarRespuestaPersonas(personasRegistradas, res);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener personas", error });
        }
    }
    manejarRespuestaPersonas<P>(personas:P[], res: Response):void{
        if (!personas || personas.length === 0) {
            res.status(404).json({ mensaje: "No se encontraron personas registradas" });
        } else {
            res.status(200).json({
                mensaje: "Personas registradas",
                datos: personas
            });
        }
    }
    findById(req: Request, res: Response): void {
        const { id } = req.params;
        const persona = this.personaSer.obtenerPorId(id);
    
        if (!persona) {
            res.status(404).json("No se encontró la persona que buscas");
        } else {
            res.status(200).json(persona);
        }
    }
    add(req: Request, res: Response): void {
        const datosPersona = req.body;
    
        if (this.personaSer.esArgumentoCorrecto(datosPersona)) {
            const idNewPerson = this.personaSer.pushNewEntity(datosPersona);
    
            if (!idNewPerson || typeof idNewPerson !== 'string' || idNewPerson.trim() === '') {
                res.status(500).json("Error al guardar la persona");
            } else {
                res.status(200).json(idNewPerson);
            }
        } else {
            res.status(400).json('Se introdujeron datos incorrectos');
        }
    }
    
    deleteById(req: Request, res: Response): void {
        const  id = req.params.id;
            try{
                this.personaSer.eliminarPorId(id);
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
        
}