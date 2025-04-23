import { AutoPersonalizadoDto } from "../../DTOs/auto/autoPersonalizado.dto";
import { AutoResumenDto } from "../../DTOs/auto/autoResumen.dto";
import { Auto } from "../../models/auto.model";
import { AutoRepository } from "../../repositoryes/auto/auto.repository";


export class AutoService extends Service< Auto, AutoResumenDto, AutoPersonalizadoDto>{
    private autoRepo= new AutoRepository;

    listarTodos(): Auto[] {
        return this.autoRepo.getAll();
    }
    obtenerPorId(id: string):Auto| undefined {
        return this.autoRepo.getById(id);
    }
    listarResumen(): AutoResumenDto[] {
        return this.autoRepo.getSummaryList();
    }
    eliminarPorId(id: string): void {
        this.autoRepo.deleteById(id);
    }
    listarConArgumentodPedidos(campos: (keyof Auto)[]): AutoPersonalizadoDto[] {
        return this.autoRepo.getCustomInfo(campos);
    }
    esArgumentoCorrecto(autoDto: Auto): boolean {
        if (!autoDto) return false;
    
        const {color, anio, duenio, marca, modelo, motor, numerodeChasis, patente} = autoDto;
    
        return (
            typeof color === 'string' && color.trim() !== '' &&
            typeof anio === 'number' && anio > 1900 &&
            typeof duenio === 'string' && duenio.trim() !== '' &&
            typeof marca === 'string' && marca.trim() !== '' &&
            typeof modelo === 'string' && modelo.trim() !== '' &&
            typeof motor === 'string' && motor.trim() !== '' &&
            typeof numerodeChasis === 'string' && numerodeChasis.trim() !== '' &&
            typeof patente === 'string' && patente.trim() !== ''
        );
    }
    
    pushNewEntity(autoDto: Auto): string {
        let auto: Auto={
            id: '',
            marca: autoDto.marca,
            modelo: autoDto.modelo,
            anio: autoDto.anio,
            patente: autoDto.patente,
            color: autoDto.color,
            numerodeChasis: autoDto.numerodeChasis,
            motor: autoDto.motor,
            duenio: autoDto.duenio
        }
        return this.autoRepo.addEntity(auto);
    }
    listarAutosDelDuenio(idPersona: string): Auto[] {
        return this.autoRepo.findAutosByDuenio(idPersona);
    }
    cheahearLista(autos:Auto[]): boolean{
        return !autos || autos.length === 0;
    }
    
}