import { ControllerGenerico } from '../ControllerGenerico';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../service/persona.service';
import { Request, Response } from 'express';
import { dtoToPersona, personaToDto } from '../../DTOs/PersonaDTO';

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

      const persona = await this.service.add(dtoToPersona(personaDto));
      res.status(201).json({
        mensaje: 'La persona fue creada exitosamente',
        dato: personaToDto(persona)
      });

    } catch (error) {
      if (error instanceof Error && (
        error.name === 'ValidationError' ||
        error.message.toLowerCase().includes('invalid'))
      ) {
        res.status(400).json({ mensaje: 'Datos inválidos en el body', error: error.message });
      } else {
        res.status(500).json({ mensaje: 'Error creando persona', error: String(error) });
      }
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const persona = await this.service.findById(req.params.id);
      if (!persona) {
        res.status(404).json({ mensaje: 'Persona no encontrada' });
        return;
      }
      res.status(200).json(personaToDto(persona));
    } catch (error) {
      res.status(500).json({ mensaje: 'Error obteniendo persona', error: String(error) });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const filtro = req.query;
      const personas = await this.service.findAll(filtro);
      res.status(200).json(personas.map(personaToDto));
    } catch (error) {
      res.status(500).json({ mensaje: 'Error listando personas', error: String(error) });
    }
  }
}
