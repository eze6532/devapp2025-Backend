import { Request, Response } from 'express';
import { IService } from '../service/interface.service';

export class ControllerGenerico<T> {
  constructor(public service: IService<T>) {
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.add = this.add.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.edit = this.edit.bind(this);
  }
  // no es tan generico es mas bien el de persona
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const entidad= req.query;
      
      const data = await this.service.findAll(entidad);
      res.json(data);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error obteniendo elementos', error });
    }
  }

  //  generico
  async findById(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.findById(req.params.id);
      if (!data) {
        res.status(404).json({ mensaje: 'No encontrado' });
        return
      }
       res.json(data);
       return
    } catch (error) {
      res.status(500).json({ mensaje: 'Error buscando elemento', error });
    }
  }
  //generico
  async add(req: Request, res: Response): Promise<void> {
    try {
      const nuevo = await this.service.add(req.body);
      res.status(201).json(nuevo);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error agregando elemento', error });
    }
  }
  //generico
  async deleteById(req: Request, res: Response): Promise<void> {
    try {
      const eliminado = await this.service.delete(req.params.id);
      if (!eliminado) {
        res.status(404).json({ mensaje: 'Elemento no encontrado para eliminar' });
        return;
      }
      res.json({ mensaje: 'Elemento eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error eliminando elemento', error });
    }
  }
  
  async edit(req: Request, res: Response): Promise<void> {
    try {
      const actualizado = await this.service.update(req.params.id, req.body);
      if (!actualizado) {
        res.status(404).json({ mensaje: 'Elemento no encontrado para actualizar' });
        return;
      }
   
      res.status(201).json(actualizado);
    } catch (error) {
      
      if (error instanceof Error &&(
          error.name === 'ValidationError' ||
          error.message.toLowerCase().includes('invalid'))
        ) {
          res.status(400).json({
          mensaje: 'Datos inválidos en la solicitud',
          error: error.message
        });
        } else {
          res.status(500).json({ mensaje: 'Error actualizando elemento', error });
        }
    }
  }
}
