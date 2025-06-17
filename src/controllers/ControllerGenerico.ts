import { Request, Response, NextFunction } from 'express';
import { IService } from '../service/interface.service';

export class GenericController<T> {
  constructor(protected service: IService<T>) {
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.add = this.add.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.update = this.update.bind(this);
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filter = req.query as Partial<T>;
      const results = await this.service.findAll(filter);
      res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.service.findById(req.params.id);
      if (!result) {
        res.status(404).json({ mensaje: 'Elemento no encontrado' });
        return;
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const nuevo = await this.service.add(req.body);
      res.status(201).json(nuevo);
    } catch (error) {
      next(error);
    }
  }

  async deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const eliminado = await this.service.delete(req.params.id);
      if (!eliminado) {
        res.status(404).json({ mensaje: 'Elemento no encontrado para eliminar' });
        return;
      }
      res.status(200).json({ mensaje: 'Elemento eliminado correctamente' });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const actualizado = await this.service.update(req.params.id, req.body);
      if (!actualizado) {
        res.status(404).json({ mensaje: 'Elemento no encontrado para actualizar' });
        return;
      }
      res.status(200).json(actualizado);
    } catch (error) {
      next(error);
    }
  }
}
