import { Request, Response } from 'express';
import { AutoService } from '../../service/auto.service';
import { PersonaService } from '../../service/persona.service';
import { ControllerGenerico } from '../ControllerGenerico';
import { Auto } from '../../models/auto.model';
import { autoToDto, dtoToAuto } from '../../DTOs/AutoDTO';

export class AutoController extends ControllerGenerico<Auto> {
  constructor(
    private autoService: AutoService,
    private personaService: PersonaService
  ) {
    super(autoService);
    this.getDuenio = this.getDuenio.bind(this);
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { idPersona } = req.query;
      const filtro = idPersona ? { duenio: idPersona as string } : {};
      const autos = await this.autoService.findAll(filtro);
      res.status(200).json(autos.map(autoToDto));
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error obteniendo autos',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  async add(req: Request, res: Response): Promise<void> {
    try {
      const autoDto = req.body;

      const autoExiste = await this.autoService.findByPatenteAndChasi(autoDto.patente, autoDto.numerodeChasis);
      if (autoExiste) {
        res.status(409).json({
          mensaje: `Ya existe un auto registrado con patente: ${autoDto.patente} y chasis: ${autoDto.numerodeChasis}`
        });
        return;
      }

      const duenio = await this.personaService.findById(autoDto.duenio);
      if (!duenio) {
        res.status(404).json({ mensaje: 'No se encontró el dueño de este auto' });
        return;
      }

      const auto = await this.autoService.add(dtoToAuto(autoDto));

      await this.personaService.update(autoDto.duenio, {
        $push: { autos: auto._id }
      });

      res.status(201).json({
        mensaje: 'El auto se cargó correctamente',
        dato: autoToDto(auto)
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error creando auto',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  async getDuenio(req: Request, res: Response): Promise<void> {
    try {
      const autoId = req.params.idAuto;
      const auto = await this.autoService.findById(autoId);

      if (!auto || !auto.duenio) {
        res.status(404).json({ mensaje: 'No se encontró el auto o el auto no tiene dueño' });
        return;
      }
      res.status(200).json(auto.duenio); 
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener el dueño del auto',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }
}
