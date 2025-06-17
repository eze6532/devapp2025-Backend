import { Router } from "express";
import { PersonaService } from "../service/persona.service";
import { PersonaController } from "../controllers/persona/personaController";
import { IRepository } from "../repositories/IRepository";
import { Persona } from "../models/persona.model";
import { Auto } from "../models/auto.model";



export function createPersonaRouter(personaRepo: IRepository<Persona>,autoRepo: IRepository<Auto>): Router {
  const personaService = new PersonaService(personaRepo, autoRepo);
  const personaController = new PersonaController(personaService);

  const router = Router();

  router.get('/', personaController.findAll);
  router.get('/:id', personaController.findById);
  router.post('/', personaController.add);
  router.delete('/:id', personaController.deleteById);
  router.put('/edit/:id', personaController.update);

  return router;
}