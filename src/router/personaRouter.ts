import { Router } from "express";
import { AutoController } from "../controllers/auto/auto.controller";



const autoRouter = Router();
const autoController= new AutoController();

autoRouter.get("/auto/lista", autoController.findAll);
autoRouter.get("/auto/:id", autoController.findById);
autoRouter.post("/auto/add", autoController.add);
autoRouter.delete("/auto/delete", autoController.deleteById);
autoRouter.get('/autos/duenio',autoController.findByDuenio);

export default autoRouter;