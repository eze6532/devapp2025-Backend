import Auto from './Auto'
import { darId } from './Personas';

let autos: Auto[] = [];


export let autoDeLupita: Auto = {
    id: darId(),
    marca:'Fotorama',
    modelo:'Terrenator',
    anio:2012,
    patente:'AF 456 RF',
    color: 'Verde mate con lineas negras',
    numerodeChasis: 'BF-55-5544',
    motor: '5V',
    duenio: '',
};
export let autoDeCastor: Auto = {
    id: darId(),
    marca:'Fotorama',
    modelo:'Terrenator',
    anio:2012,
    patente:'AF 456 RF',
    color: 'Verde mate con lineas negras',
    numerodeChasis: 'BF-55-5544',
    motor: '5V',
    duenio: '',
};
export let autoDeLupitaII: Auto = {
    id: darId(),
    marca:'Fotorama',
    modelo:'Terrenator',
    anio:2012,
    patente:'AF 456 RF',
    color: 'Verde mate con lineas negras',
    numerodeChasis: 'BF-55-5544',
    motor: '5V',
    duenio: '',
};

autos=[autoDeLupita, autoDeLupitaII, autoDeCastor]

export { autos }
