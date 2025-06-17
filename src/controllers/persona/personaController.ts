import { Request, Response, NextFunction } from 'express';
import { PersonaService } from '../../service/persona.service';
import { Persona } from '../../models/persona.model';
import { dtoToPersona, personaToDto } from '../../DTOs/PersonaDTO';
import { GenericController } from '../ControllerGenerico';

export class PersonaController extends GenericController<Persona> {
  constructor(private personaService: PersonaService) {
    super(personaService);
  }

  async add(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const personaDto = req.body;
    
    const errorMsg = this.validarPersonaDto(personaDto);
    if (errorMsg) {
      res.status(400).json({ mensaje: errorMsg });
      return;
    }

    const existente = await this.personaService.findByDni(personaDto.dni);
    if (existente) {
      res.status(409).json({ mensaje: `Ya existe una persona con DNI ${personaDto.dni}` });
      return;
    }

    const persona = await this.service.add(dtoToPersona(personaDto));
    res.status(201).json({
      mensaje: 'Persona creada correctamente',
      dato: personaToDto(persona)
    });

  } catch (error) {
    next(error);
  }
}

  

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const personas = await this.service.findAll();
      res.status(200).json(personas.map(personaToDto));
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const persona = await this.service.findById(req.params.id);
      if (!persona) {
        res.status(404).json({ mensaje: 'Persona no encontrada' });
        return;
      }
      res.status(200).json(personaToDto(persona));
    } catch (error) {
      next(error);
    }
  }

///sub funciones

  private validarPersonaDto(personaDto: any): string | null {
    if (!this.esEdadValida(personaDto.fechaDeNacimiento)) {
      return "La persona debe tener entre 17 y 110 años.";
    }
    if (!this.esDniValido(personaDto.dni)) {
      return "El DNI ingresado no es válido.";
    }
    
    return null; 
  }

  private esEdadValida(fechaNacimiento: Date | string | undefined): boolean {
    if (!fechaNacimiento) return false;

    const hoy = new Date();
    const fecha = new Date(fechaNacimiento);

    if (fecha > hoy) return false;
    
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();

    const mesNacimiento = fecha.getMonth();
    const diaNacimiento = fecha.getDate();

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
      edad--;
    }

    return edad >= 17 && edad <= 110;
  }
  private esDniValido(dni: string | number): boolean {
    const dniString = String(dni).trim();
    const soloNumeros = /^[0-9]+$/.test(dniString);

    return (
      soloNumeros &&
      dniString.length >= 7 &&
      dniString.length <= 8
    );
  }

}
