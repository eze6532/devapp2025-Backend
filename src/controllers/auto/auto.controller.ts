import { Request, Response, NextFunction } from 'express';
import { GenericController } from '../ControllerGenerico';
import { AutoService } from '../../service/auto.service';
import { PersonaService } from '../../service/persona.service';
import { Auto } from '../../models/auto.model';
import { autoToDto, dtoToAuto } from '../../DTOs/AutoDTO';


export class AutoController extends GenericController<Auto> {
  constructor(
    private autoService: AutoService,
    private personaService: PersonaService
  ) {
    super(autoService);
    this.getDuenio = this.getDuenio.bind(this);
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { idPersona } = req.query;
      const filtro = idPersona ? { duenio: idPersona as string } : {};
      const autos = await this.autoService.findAll(filtro);
      res.status(200).json(autos.map(autoToDto));
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const autoDto = req.body;
      const anioValido = this.esAnioValido(autoDto.anio);
      if (!anioValido) {
        res.status(400).json({ error: 'El año de creación no puede ser mayor al año actual.' });
        return;
      }
      const camposValidos = this.validarCamposObligatorios(autoDto, res);
      if (!camposValidos) return;

      const patenteValida = this.validarFormatoPatente(autoDto.patente, res);
      if (!patenteValida) return;

      const chasisValido = this.validarNumeroChasis(autoDto.numerodeChasis, res);
      if (!chasisValido) return;

      const autoExistente = await this.verificarExistenciaAuto(autoDto, res);
      if (autoExistente) return;

      const duenio = await this.verificarExistenciaDuenio(autoDto.duenio, res);
      if (!duenio) return;

      const autoCreado = await this.autoService.add(dtoToAuto(autoDto));
      await this.personaService.agregarAuto(duenio.id, autoCreado.id);

      res.status(201).json({
        mensaje: 'El auto se cargó correctamente',
        dato: autoToDto(autoCreado)
      });

    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const auto = await this.service.findById(req.params.id);
      if (!auto) {
        res.status(404).json({ mensaje: 'Auto no encontrado' });
        return;
      }
      res.status(200).json(autoToDto(auto));
    } catch (error) {
      next(error);
    }
  }

  async getDuenio(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const autoId = req.params.idAuto;
      const duenio = await this.autoService.findByDuenio(autoId);
      if (!duenio) {
        res.status(404).json({ mensaje: 'No se encontró el dueño' });
        return;
      }
      res.status(200).json(duenio);
    } catch (error) {
      next(error);
    }
  }


  private esAnioValido(anio: number): boolean {
    const anioActual = new Date().getFullYear();
    return anio <= anioActual;
  }

  private validarCamposObligatorios(autoDto: any, res: Response): boolean {
    const camposObligatorios = ['patente', 'numerodeChasis', 'duenio'];
    for (const campo of camposObligatorios) {
      if (!autoDto[campo]) {
        res.status(400).json({ mensaje: `Falta el campo obligatorio: ${campo}` });
        return false;
      }
    }
    return true;
  }

  private validarFormatoPatente(patente: string, res: Response): boolean {
    const limpia = patente.toUpperCase().replace(/\s/g, '');
    const formatoViejo = /^[A-Z]{3}\d{3}$/;
    const formatoNuevo = /^[A-Z]{2}\d{3}[A-Z]{2}$/;

    if (!formatoViejo.test(limpia) && !formatoNuevo.test(limpia)) {
      res.status(400).json({ mensaje: `Formato de patente inválido: ${patente}` });
      return false;
    }
    return true;
  }

  private validarNumeroChasis(chasis: string, res: Response): boolean {
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    if (!vinRegex.test(chasis)) {
      res.status(400).json({ mensaje: `Número de chasis inválido. Debe tener 17 caracteres alfanuméricos válidos (sin I, O, Q).` });
      return false;
    }
    return true;
  }

  private async verificarExistenciaAuto(autoDto: any, res: Response): Promise<boolean> {
    const existente = await this.autoService.findByPatenteAndChasi(
      autoDto.patente,
      autoDto.numerodeChasis
    );
    if (existente) {
      res.status(409).json({
        mensaje: `Ya existe un auto con patente: ${autoDto.patente} y chasis: ${autoDto.numerodeChasis}`
      });
      return true;
    }
    return false;
  }

  private async verificarExistenciaDuenio(duenioId: string, res: Response) {
    const duenio = await this.personaService.findById(duenioId);
    if (!duenio) {
      res.status(404).json({ mensaje: 'No se encontró el dueño de este auto' });
      return null;
    }
    return duenio;
  }
  
}
