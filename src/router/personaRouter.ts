
import { Router } from "express";
import { PersonaController } from "../controllers/persona/personaController";


const personaRouter = Router();
const personaController= new PersonaController();
const lista='lista';
personaRouter.get(`${lista}`, personaController.findAll.bind(personaController));
personaRouter.get(`/${lista}/resumen`, personaController.findAllSummary.bind(personaController));
personaRouter.get(`/${lista}/personalizado`, personaController.findAllCustomInfo.bind(personaController));
personaRouter.get(`/${lista}/filtra/:argumento`, personaController.findAllFilterArgument.bind(personaController));
personaRouter.get('/:id', personaController.findById.bind(personaController));
personaRouter.post('/add', personaController.add.bind(personaController));
personaRouter.delete('/delete/:id', personaController.deleteById.bind(personaController));

export default personaRouter;