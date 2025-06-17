import { Auto } from "../models/auto.model";
import { Persona } from "../models/persona.model";
import { IRepository } from "../repositories/IRepository";
import { ServiceGenerico } from "./ServiceGenerico";


export class AutoService extends ServiceGenerico<Auto> {
  constructor(
    protected repoAuto: IRepository<Auto>,
    private repoPersona: IRepository<Persona>
  ) {
    super(repoAuto);
  }

  findAll(filter?: Partial<Auto>) {
    return this.repoAuto.findAll(filter, "marca modelo anio patente");
  }

  async delete(autoId: string): Promise<Auto | null> {
    const auto = await this.repoAuto.findById(autoId);
    if (!auto) return null;

    if (auto.duenio && this.repoPersona.quitarAutoArray) {
      await this.repoPersona.quitarAutoArray(auto.duenio, autoId);
    }

    return this.repoAuto.deleteById(autoId);
  }

  async findByDuenio(autoId: string) {
    const auto = await this.repoAuto.findById(autoId);
    if (!auto?.duenio) return null;
    return { duenio: auto.duenio };
  }

  async findByPatenteAndChasi(patente: string, numerodeChasis: string): Promise<boolean> {
    const auto = await this.repoAuto.findOneByFields({ patente, numerodeChasis });
    return !!auto;
  }
}
