import { Auto } from "../models/auto.model";
import { autos } from "../db/datos.db";
import { personas } from "../db/datos.db";
import { darId } from "../utilid/utilid";


//(mostrando marca, modelo, año y patente)
interface InformacionBasicaAuto{
    id: string,
    marca: string,
    modelo: string,
    anio: number,
    patente: string,
}
const listarAutos=():InformacionBasicaAuto[]=>{

    return infoBasicaDeAuto(autos);
}
const listarAutosDelDuenio=(idPersona:string):InformacionBasicaAuto[]=>{
    const autosDeIdPerona= personas.find(p=>p.id===idPersona)?.autos;
    
    if (!autosDeIdPerona|| autosDeIdPerona.length === 0){
        return [];
    }else{
        return infoBasicaDeAuto(autosDeIdPerona);
    }
}
const infoBasicaDeAuto=(autos:Auto[]):InformacionBasicaAuto[]=>{
    return autos.map(auto => ({
            id:auto.id,
            marca:auto.marca,
            modelo: auto.modelo,
            anio: auto.anio,
            patente: auto.patente,
        }));
}

const buscarAuto=(idAuto:string): Auto|undefined=>{
    return autos.find(a=>a.id===idAuto);
}
const sonDeTiposCorrectos =(auto:Auto): boolean=>{
    return (
        typeof auto.marca=='string'||
        typeof auto.modelo=='string'||
        typeof auto.anio=='number'||
        typeof auto.patente=='string'||
        typeof auto.color=='string'||
        typeof auto.numerodeChasis=='string'||
        typeof auto.motor=='string'
    );
}
const sonArgumentosCorrectos= (auto: Auto): boolean => {
    const clavesValidas = [
        "marca",
        "modelo",
        "anio",
        "patente",
        "color",
        "numerodeChasis",
        "motor",
        "duenio",
    ];
    const clavesAuto = Object.keys(auto);
    const tieneSoloClavesValidas = clavesAuto.length==clavesValidas.length
    
    return tieneSoloClavesValidas;
    
}
const registrarAuto=(newAuto:Auto):Auto|undefined=>{
    const duenio= personas.find(p=>p.id===newAuto.duenio);
    if(!duenio){
        return undefined;
    }
    if(!duenio.autos){
        duenio.autos=[];
    }
    newAuto.id=`${darId()}-${duenio.autos?.length}`;
    duenio.autos?.push(newAuto);
    return newAuto;
    
}
const obtenerIdDelDuenio=(auto:Auto):string|undefined=>{

    const duenio= personas.find(p=>p.autos?.some(a=>a.id===auto.id));
    return duenio?.id;
    
}
const eliminarAuto=(idPersona:string)=>{
    const index= autos.findIndex(a=> a.id===idPersona);
    autos.splice(index)
}
export {  registrarAuto, obtenerIdDelDuenio, eliminarAuto, sonArgumentosCorrectos,  listarAutos, sonDeTiposCorrectos,
    buscarAuto, listarAutosDelDuenio,
 };
