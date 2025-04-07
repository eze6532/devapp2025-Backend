import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import { buscarAuto, listarAutos, listarAutosDelDuenio, isArgumentosCorrectoAuto, registrarAuto, obtenerIdDelDuenio } from './servers/autoServer';
import {  personas } from './repositories/personaRepositori';
import {  buscarPersona, registrarPersona, isArgumentosCorrectoPersona, listarPersonas } from './servers/personaServer';
import { autos } from './repositories/autoRepositori';
const app= express();
const port= process.env.PORT || 9000;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// endpoint de arranque

app.get('/',(req,res)=>{
    console.log(req.headers);
    res.json('Hello word');
});
app.post('/login',(req,res)=>{
    console.log(req.method);
    res.json('Login OK')
})

// inicio del futuro controllador de Auto

app.get('/listar-auto',(req,res) =>{
    const { idPersona } = req.query;
    if(!idPersona){
        res.status(200).json(listarAutos());
    }else{
        const autosDeIdPersona=listarAutosDelDuenio(idPersona as string);
        if(!autosDeIdPersona||autosDeIdPersona.length===0){
            res.status(200).json({
                mensaje:'Se encontro el dueño pero no tiene auto',
                dato:[]
            })
        }else{
            res.status(200).json({
                mensaje:'Se encontro el deuño y sus autos',
                dato:autosDeIdPersona
            })
        }
    }
});

app.get('/auto/:id',(req,res)=>{
    const { id }=req.params;
    const auto=buscarAuto(id);

    if(!auto){
        res.status(404).json("No se encontro el veiculo que buscas");
    }else{
        res.status(200).json(auto);
    }
})
app.post('/add/auto', (req, res) => {
    const datosAuto = req.body;

    if (isArgumentosCorrectoAuto(datosAuto)) {
        const autoCargado=registrarAuto(datosAuto);
        if(!autoCargado){
            res.status(404).json('No se encontro el dueño de este auto')
        }else{
            res.status(200).json({
                mensaje:'El auto se cargo correctamente',
                dato:autoCargado
            })
        }
    } else {
        res.status(400).json("Se introdujeron datos inválidos");
    }
});



//fin del controllador de Auto-------
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// inicio del futuro controlador de Persona

//Buscar personas con sus autos
app.get('/personas-autos', (req, res) => {
  
    res.json(personas);
});

//Devuelve la informacion vasica de las personas
app.get('/listar-persona',(req,res) =>{
    const personasRegistradas= listarPersonas();
    if (!personasRegistradas){
        res.status(404).json("No se encontraron personas registradas");
    }else{
        res.status(200).json({
            mensaje: "Personas registradas",
            datos: personasRegistradas
        });
    
}});
app.get('/persona/:id',(req,res)=>{
    const { id }=req.params;
    const persona= buscarPersona(id);

    if(!persona){
        res.status(404).json("No se encontro la persona que buscas");
    }else{
        res.status(200).json(persona)
    }
})
app.post('/add/persona',(req,res)=>{
    const datosPersona= req.body;
    if(isArgumentosCorrectoPersona(datosPersona)){
        const newPersosna=registrarPersona(datosPersona);
        res.status(200).json(newPersosna.id);
    }else{
        res.status(400).json('Se introdujieron datos incorrectos')
    }
    

})
// fin del controlador de Persona------
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
