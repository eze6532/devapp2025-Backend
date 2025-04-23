import { Request, Response } from "express";

export abstract class Controller{
    abstract findAll(req: Request, res: Response): void;
    abstract findById(req: Request, res: Response): void;
    abstract add(req: Request, res: Response): void;
    abstract deleteById(req: Request, res: Response): void;
}