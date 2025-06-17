import { Auto } from "../models/auto.model";
import { Persona } from "../models/persona.model";
import { IRepository } from "../repositories/IRepository";
import { ServiceGenerico } from "./ServiceGenerico";


export class PersonaService extends ServiceGenerico<Persona> {
  constructor(
    protected repoPersona: IRepository<Persona>,
    private repoAuto: IRepository<Auto>
  ) {
    super(repoPersona);
  }

  findAll() {
    return this.repoPersona.findAll({}, "dni apellido nombre");
  }

  findByDni(dni: string) {
    return this.repoPersona.findOneByFields({ dni });
  }

  async delete(id: string): Promise<Persona | null> {
    const persona = await this.repoPersona.findById(id);
    if (!persona) return null;

    const autos = await this.repoAuto.findAll({ duenio: id });
    for (const auto of autos) {
      await this.repoAuto.deleteById(auto.id);
    }

    return this.repoPersona.deleteById(id);
  }

  agregarAuto(personaId: string, autoId: string): Promise<void> {
    if (!this.repoPersona.agregarAutoArray) {
      return Promise.reject(new Error("Método agregarAutoArray no implementado"));
    }
    return this.repoPersona.agregarAutoArray(personaId, autoId);
  }

  quitarAuto(personaId: string, autoId: string): Promise<void> {
    if (!this.repoPersona.quitarAutoArray) {
      return Promise.reject(new Error("Método quitarAutoArray no implementado"));
    }
    return this.repoPersona.quitarAutoArray(personaId, autoId);
  }
}
