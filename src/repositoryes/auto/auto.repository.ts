import { autos } from "../../db/datos.db";
import { AutoPersonalizadoDto } from "../../DTOs/auto/autoPersonalizado.dto";
import { AutoResumenDto } from "../../DTOs/auto/autoResumen.dto";
import { Auto } from "../../models/auto.model";
import { darId } from "../../utilid/utilid";
import { Repository } from "../repository";


export class AutoRepository extends Repository<Auto,AutoResumenDto, AutoPersonalizadoDto>{
   
    public autos: Auto[]= autos;

    public getAll(): Auto[]{
        return this.autos;
    };
    public getById(id: string): Auto | undefined{
        return this.autos.find(a=>a.id===id);
    };
    public getSummaryList(): AutoResumenDto[]{
        return this.autos.map(
                a=>({
                    id: a.id,
                    marca: a.marca,
                      modelo: a.modelo,
                    patente: a.patente,
                }));
    };
    public deleteById(id: string): void{
        const index= autos.findIndex(a=> a.id===id);
        autos.splice(index)
    };
    public getCustomInfo(campos: (keyof Auto)[]): AutoPersonalizadoDto[]{
        return this.autos.map(auto => {
                let info: any = {};
                campos.forEach(campo => {
                    info[campo] = auto[campo];
                });
                return info as AutoPersonalizadoDto;
            });
        
    };
    public addEntity(auto: Auto): string {
        auto.id = darId();
        this.autos.push(auto)
        return auto.id;
    }
    public findAutosByDuenio(idPersona: string): Auto[] {
        return this.autos.filter(auto => auto.duenio === idPersona);
    }
    public getEntityFieldsById(id: string, campos: (keyof Auto)[]): AutoPersonalizadoDto[] {
        throw new Error("Method not implemented.");
    }
}


