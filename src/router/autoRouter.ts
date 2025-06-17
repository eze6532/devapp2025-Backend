import { Router } from 'express';
import { AutoService } from '../service/auto.service';
import { PersonaService } from '../service/persona.service';
import { AutoController } from '../controllers/auto/auto.controller';
import { IRepository } from '../repositories/IRepository';
import { Auto } from '../models/auto.model';
import { Persona } from '../models/persona.model';


export function createAutoRouter(autoRepo: IRepository<Auto>,personaRepo: IRepository<Persona>): Router {
  const autoService = new AutoService(autoRepo,personaRepo);
  const personaService = new PersonaService(personaRepo, autoRepo);
  const autoController = new AutoController(autoService, personaService);

  const router = Router();

  router.get('/', autoController.findAll);
  router.get('/:id', autoController.findById);
  router.post('/', autoController.add);
  router.delete('/:id', autoController.deleteById);
  router.put('/edit/:id', autoController.update);
  router.get('/duenio/:idAuto', autoController.getDuenio);

  return router;
}
