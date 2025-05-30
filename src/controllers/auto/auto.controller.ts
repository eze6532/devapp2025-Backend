import { Request, Response } from 'express';
import { AutoService } from '../../service/auto.service';
import { PersonaService } from '../../service/persona.service';
import { ControllerGenerico } from '../ControllerGenerico';
import { Auto } from '../../models/auto.model';

export class AutoController extends ControllerGenerico<Auto>{

    constructor(
        private autoService: AutoService,
        private personaService: PersonaService
    ) {
        super(autoService)
     
    }
 
    async findAll(req: Request, res: Response): Promise<void> {
        const { idPersona } = req.query;

        try {
            let autos;

            if (idPersona) {
                autos = await this.autoService.findAll({ duenio: idPersona as string });
                
            } else {
                autos = await this.autoService.findAll();
                
            }
            res.status(200).json(autos);
            return
              
        } catch (error) {
            res.status(500).json({ 
                mensaje: 'Error obteniendo autos',
                error: error instanceof Error ? error.message : String(error) });
                return
        }

    }

    async add(req: Request, res: Response): Promise<void> {
        try {
            const autoDto = req.body;

            // Verifico si ya existe el auto
            const autoExiste = await this.autoService.findByPatenteAndChasi(autoDto.patente, autoDto.numerodeChasis);
            if (!autoExiste) {
                res.status(409).json({
                    mensaje: `Ya existe un auto registrado con patente: ${autoDto.patente} y chasis: ${autoDto.numerodeChasis}`
                });
                return; 
            }

            // Verifico si el dueño existe
            const duenio = await this.personaService.findById(autoDto.duenio);
            if (!duenio) {
                res.status(404).json({ mensaje: 'No se encontró el dueño de este auto' });
                return; 
            }

            // Agrego el auto
            const auto = await this.autoService.add(autoDto);
            await this.personaService.update(autoDto.duenio, {
                $push: { autos: auto._id }});

            res.status(201).json({
                mensaje: 'El auto se cargó correctamente',
                dato: auto
            });
        } catch (error) {
            res.status(500).json({ mensaje: 'Error creando auto', error: error instanceof Error ? error.message : String(error) });
        }
    }

}
