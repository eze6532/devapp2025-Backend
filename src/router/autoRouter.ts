
import { Router } from "express";
import { PersonaController } from "../controllers/persona/personaController";


const autoRouter = Router();
const personaController= new PersonaController();

autoRouter.get("/personas/lista", personaController.findAll);
autoRouter.get("/persona/:id", personaController.findById);
autoRouter.post("/persona/add", personaController.add);
autoRouter.delete("/persona/delete/:id", personaController.deleteById);

export default autoRouter;