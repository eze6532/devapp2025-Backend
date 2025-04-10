import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import { addPersona, deletePersonaById, findAllPersonas, findAllPersonasWithAutos, findPersonaById } from '../controllers/personaController';
import { addAuto, deleteAutoById, findAllAutos, findAutoById } from '../controllers/auto.controller';

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
//inicio: endpoints de Persona
    //Listar
        app.get('/listar-persona',findAllPersonas );
        app.get('/personas-autos',findAllPersonasWithAutos );

    //Buscar
        app.get('/persona/:id',findPersonaById);

    //agrega una persona
        app.post('/add/persona',addPersona);
    //eliminar
        app.delete('/eliminar/persona/',deletePersonaById);
//fin: endpoints de Persona
//-----
//inicio: endpoints Auto
    //Listar
        app.get('/listar-auto',findAllAutos);
    //buscar un auto
        app.get('/auto/:id',findAutoById);
    //agregar un auto
        app.post('/add/auto', addAuto);
    //eliminar un auto
        app.delete('/delete', deleteAutoById);
//fin: endpoint 


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
