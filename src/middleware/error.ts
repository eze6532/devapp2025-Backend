import { Request, Response, NextFunction } from 'express';

export function middlewareError(err: unknown,req: Request,res: Response,next: NextFunction): void {
  console.error(`[Error] ${req.method} ${req.path}`, err);

  if (err instanceof Error) {
    if (
      err.name === 'ValidationError' ||
      err.message.toLowerCase().includes('invalid')
    ) {
      res.status(400).json({
        mensaje: 'Datos inválidos en la solicitud',
        error: err.message,
      });
      return;
    }

    res.status(500).json({
      mensaje: 'Error interno del servidor',
      error: err.message,
    });
  } else {
    res.status(500).json({
      mensaje: 'Error inesperado',
      error: String(err),
    });
  }
}
