import { Types } from "mongoose";
import mongoose from "mongoose";
import { Genero } from "../models/genero.model";
import { PersonaModel } from "./persona.db";
import { AutoModel } from "./auto.db";


async function main() {
    await mongoose.connect('mongodb://localhost/AutoPersonaDB');

    const persona = new PersonaModel({
    nombre: "Ana",
    apellido: "López",
    dni: "12345678",
    fechaDeNacimiento: new Date("1990-06-10"),
    genero: Genero.F,
    donante: true,
    autos: [] // lo lleno después
    });

    await persona.save();

    const auto = new AutoModel({
    marca: "Peugeot",
    modelo: "208",
    anio: 2022,
    patente: "ABC123",
    color: "Rojo",
    numerodeChasis: "CHS123456789",
    motor: "MT456789",
    duenio: persona._id
    });

    await auto.save();

    // Asociar auto a la persona
    persona.autos.push(new Types.ObjectId(auto._id));
    await persona.save();

    mongoose.disconnect();
}
main().catch(error=> console.error(error));






// import { Auto } from "../models/auto.model";
// import { Genero } from "../models/genero.model";
// import { Persona } from "../models/persona.model";
// import { darId } from "../utilid/utilid";





// let autos: Auto[] = [];


// export let autoDeLupita: Auto = {
//     id: darId(),
//     marca:'Fotorama',
//     modelo:'Terrenator',
//     anio:2012,
//     patente:'AF 456 RF',
//     color: 'Verde mate con lineas negras',
//     numerodeChasis: 'BF-55-5544',
//     motor: '5V',
//     duenio: '',
// };
// export let autoDeCastor: Auto = {
//     id: darId(),
//     marca:'Fotorama',
//     modelo:'Terrenator',
//     anio:2012,
//     patente:'AF 456 RF',
//     color: 'Verde mate con lineas negras',
//     numerodeChasis: 'BF-55-5544',
//     motor: '5V',
//     duenio: '',
// };
// export let autoDeLupitaII: Auto = {
//     id: darId(),
//     marca:'Fotorama',
//     modelo:'Terrenator',
//     anio:2012,
//     patente:'AF 456 RF',
//     color: 'Verde mate con lineas negras',
//     numerodeChasis: 'BF-55-5544',
//     motor: '5V',
//     duenio: '',
// };




// let personas: Persona[] = [];


// let Alen:Persona = {
//     id: darId(),
//     nombre:'Alen',
//     apellido:'Rojas',
//     dni:'12.345.678',
//     fechaDeNacimento:new Date('1930/03/27'),
//     genero: Genero.M,
//     donante: true,
//     autos:[]
// };
// let Lupita:Persona = {
//     id: darId(),
//     nombre:'Lupa Maria',
//     apellido:'Hernandes',
//     dni:'12.345.679',
//     fechaDeNacimento:new Date('1999/12/24'),
//     genero: Genero.F,
//     donante: true,
//     autos:[autoDeLupita.id, autoDeLupitaII.id]
// };
// let Castor:Persona = {
//     id: darId(),
//     nombre:'Juan Castor 2',
//     apellido:'Blanco Herrero',
//     dni:'12.345.670',
//     fechaDeNacimento:new Date('1702/05/30'),
//     genero: Genero.M,
//     donante: false,
//     autos:[autoDeCastor.id]
// };
// autoDeCastor.duenio = Castor.id;
// autoDeLupita.duenio = Lupita.id;
// autoDeLupitaII.duenio=Lupita.id;
// personas=[Alen, Castor, Lupita];
// autos=[autoDeLupita, autoDeLupitaII, autoDeCastor]
// export {personas, autos};