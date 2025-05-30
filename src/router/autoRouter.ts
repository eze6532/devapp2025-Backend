import { Router } from 'express';
import { AutoModel } from '../db/auto.db';
import { PersonaModel } from '../db/persona.db';
import { MongoRepository } from '../repositories/Mongo.repository';
import { AutoService } from '../service/auto.service';
import { PersonaService } from '../service/persona.service';
import { AutoController } from '../controllers/auto/auto.controller';

const autoRepo = new MongoRepository(AutoModel);
const personaRepo = new MongoRepository(PersonaModel);

const autoService = new AutoService(autoRepo);
const personaService = new PersonaService(personaRepo);

const autoController = new AutoController(autoService, personaService);

const router = Router();

router.get('/', autoController.findAll);                  
router.get('/:id', autoController.findById);              
router.post('/', autoController.add);                     
router.delete('/:id', autoController.deleteById);         
router.post('/edit/:id', autoController.edit);


export default router;
