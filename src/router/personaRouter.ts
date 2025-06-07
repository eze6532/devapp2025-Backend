import { Router } from "express";
import { MongoRepository } from "../repositories/Mongo.repository";
import { PersonaService } from "../service/persona.service";
import { PersonaController } from "../controllers/persona/personaController";
import { PersonaModel } from "../db/persona.db";

const personaRepo = new MongoRepository(PersonaModel);
const personaService = new PersonaService(personaRepo);
const personaController = new PersonaController(personaService);

const router = Router();

router.get('/', personaController.findAll);
router.get('/:id', personaController.findById);
router.post('/', personaController.add);
router.delete('/:id', personaController.deleteById);
router.post('/edit/:id',personaController.edit);

export default router;
