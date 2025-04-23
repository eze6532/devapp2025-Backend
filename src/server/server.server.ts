import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import personaRouter from '../router/autoRouter';
import autoRouter from '../router/autoRouter';



const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Instancias de controladores


// Endpoint base
app.get('/', (req, res) => {
    console.log(req.headers);
    res.json('Hello world');
});

app.post('/login', (req, res) => {
    console.log(req.method);
    res.json('Login OK');
});
app.use("/api", personaRouter);
app.use("/api", autoRouter);


// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
