import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import { personas } from './interfaces/Personas';
import { listarAutos, listarAutosConDuenio, listarPersonas } from './BREAD/listar'
const app= express();
const port= process.env.PORT || 9000;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
// endpoint

app.get('/',(req,res)=>{
    console.log(req.headers);
    res.json('Hello word');
});
app.post('/login',(req,res)=>{
    console.log(req.method);
    res.json('Login OK')
})

// Get de Personas con sus Autos
app.get('/Personas&Autos', (req, res) => {
    console.log('pers');
    res.json(personas);
})

//endpoit Browse
// Para persona
app.get('/listarPersona',(req,res) =>{
  res.json(listarPersonas);
})

app.get('/listarPersonaII',(req,res) =>{
    res.json(personas.map(persona => ({
        id: persona.id,
        dni: persona.dni,
        nombre: persona.nombre,
        apellido: persona.apellido
    })));
  })
// Para personaAutos
app.get('/listarAuto',(req,res) =>{
res.json(listarAutos);
})
app.get('/listarAuto/:idPersona',(req,res) =>{
    const { idPersona } = req.params;
    res.json(listarAutosConDuenio(idPersona));
    })


app.get('/')



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
