import { Router } from "express";
import { AutoController } from "../controllers/auto/auto.controller";
const autoRouter = Router();
const autoController= new AutoController();

autoRouter.get('/lista', autoController.findAll.bind(autoController));
autoRouter.get('/:id', autoController.findById.bind(autoController));
autoRouter.post('/add', autoController.add.bind(autoController));
autoRouter.delete('/delete', autoController.deleteById.bind(autoController));
autoRouter.get('/duenio',autoController.findByDuenio.bind(autoController));

export default autoRouter;