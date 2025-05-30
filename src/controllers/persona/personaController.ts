import { ControllerGenerico } from '../ControllerGenerico';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../service/persona.service';
import { Request, Response } from 'express';

export class PersonaController extends ControllerGenerico<Persona> {
  constructor(public personaService: PersonaService) {
    super(personaService);
  }

  async add(req: Request, res: Response): Promise<void> {
    try {
        const personaDto = req.body;

        const personaExistente = await this.personaService.findByDni(personaDto.dni);
        if (personaExistente) {
            res.status(409).json({ mensaje: `Ya existe una persona registrada con DNI: ${personaDto.dni}` });
            return;
        }

        const personaCreada = await this.service.add(personaDto);
        res.status(201).json({
            mensaje: 'La persona fue creada exitosamente',
            dato: personaCreada
        });

    } catch (error) {
        if (
        error instanceof Error &&
        (
            error.name === 'ValidationError' ||
            error.message.toLowerCase().includes('invalid')
        )
        ) {
        res.status(400).json({ mensaje: 'Datos inválidos en el body', error: error.message });
        } else {
        res.status(500).json({ mensaje: 'Error creando persona', error: error instanceof Error ? error.message : String(error) });
        }
    }
    }

}
  

   

