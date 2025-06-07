import { Auto } from "../models/auto.model";

export interface AutoDto{
    id?: string,
    marca?: string,
    modelo?: string,
    anio?: number,
    patente?: string,
    color?: string,
    numerodeChasis?: string,
    motor?: string,
    duenio?: string,
}
export function autoToDto(auto: Auto): AutoDto {
  return {
    id: auto._id.toString(),
    marca: auto.marca,
    modelo: auto.modelo,
    anio: auto.anio,
    patente: auto.patente,
    color: auto.color,
    numerodeChasis: auto.numerodeChasis,
    motor: auto.motor,
    duenio: auto.duenio ? auto.duenio.toString() : undefined
  };
}

export function dtoToAuto(dto: AutoDto): Auto {
  if (!dto.marca || !dto.modelo || !dto.anio || !dto.patente || !dto.color || !dto.numerodeChasis || !dto.motor || !dto.duenio) {
    throw new Error("Faltan campos obligatorios en AutoDto");
  }

  const auto: Partial<Auto> = {
    marca: dto.marca,
    modelo: dto.modelo,
    anio: dto.anio,
    patente: dto.patente,
    color: dto.color,
    numerodeChasis: dto.numerodeChasis,
    motor: dto.motor,
    duenio: dto.duenio as any,
  };

  if (dto.id?.trim()) {
    auto._id = dto.id;
  }

  return auto as Auto;
}
