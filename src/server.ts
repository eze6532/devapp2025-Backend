import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';

import { PersonaModel } from './db/persona.db';
import { createPersonaRouter } from './router/personaRouter';
import { createAutoRouter } from './router/autoRouter';
import { repositoryFactory } from './repositories/repositoryFactory';
import { AutoModel } from './db/auto.db';
import { middlewareError } from './middleware/error';



const app = express();
const port = process.env.PORT || 9000;
const db = process.env.DB;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json('Hello world');
});
app.post('/login', (req, res) => {
    res.json('Login OK');
});

const autoRepo= repositoryFactory('autos', AutoModel);
const personaRepo = repositoryFactory('personas', PersonaModel);

app.use('/auto', createAutoRouter(autoRepo, personaRepo));
app.use('/persona', createPersonaRouter(personaRepo, autoRepo));

app.listen(port, () => {
    console.log(`Modo de base de datos: ${db}`);
    console.log(`Servidor escuchando en el puerto ${port}`);
});
app.use(middlewareError);

