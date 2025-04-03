import Auto from "../interfaces/Auto";
import { autos } from "../interfaces/Autos";
import { Persona } from "../interfaces/Persona";
import { personas } from "../interfaces/Personas";

interface InformacionBasicaPersona{
    dni: string,
    nombre: string,
    apellido: string
}
//mostrando solo DNI, nombre y apellido

const listarPersonas = ():InformacionBasicaPersona[]  =>{
    return personas.map(persona => ({
        id: persona.id,
        dni: persona.dni,
        nombre: persona.nombre,
        apellido: persona.apellido
    }));
}

type PersonaBsica=Pick< Persona,'id'|'dni' | 'nombre' | 'apellido' >;
const listarPersonasII = ():PersonaBsica[]  =>{
    return personas.map(persona => ({
        id:persona.id,
        dni:persona.dni,
        nombre:persona.nombre,
        apellido:persona.apellido
    }));
}
//(mostrando marca, modelo, año y patente)
interface InformacionBasicaAuto{
    id: string,
    marca: string,
    modelo: string,
    anio: number,
    patente: string,
}
const listarAutos=():InformacionBasicaAuto[]=>{

    return autos.map(auto => ({
        id:auto.id,
        marca:auto.marca,
        modelo: auto.modelo,
        anio: auto.anio,
        patente: auto.patente,
    }));
}
const listarAutosConDuenio=(idPersona:string):InformacionBasicaAuto[]=>{

    return autos.map(auto => ({
        id:auto.id,
        marca:auto.marca,
        modelo: auto.modelo,
        anio: auto.anio,
        patente: auto.patente,
    }));
}
export {listarPersonas, listarPersonasII, listarAutos, listarAutosConDuenio};
