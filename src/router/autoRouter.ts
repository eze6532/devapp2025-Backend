
import { Router } from "express";
import { PersonaController } from "../controllers/persona/personaController";


const personaRouter = Router();
const personaController= new PersonaController();

personaRouter.get("/personas/lista", personaController.findAll);
personaRouter.get("/persona/:id", personaController.findById);
personaRouter.post("/persona/add", personaController.add);
personaRouter.delete("/persona/delete/:id", personaController.deleteById);

export default personaRouter;