import { Router } from "express";
import { AutoController } from "../controllers/auto/auto.controller";



const personaRouter = Router();
const autoController= new AutoController();

personaRouter.get("/auto/lista", autoController.findAll);
personaRouter.get("/auto/:id", autoController.findById);
personaRouter.post("/auto/add", autoController.add);
personaRouter.delete("/auto/delete", autoController.deleteById);
personaRouter.get('/autos/duenio',autoController.findByDuenio);

export default personaRouter;