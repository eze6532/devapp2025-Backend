import mongoose from "mongoose";

export const conectarDB = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error('No se encontró la variable MONGO_URL en el archivo .env');
        }

        await mongoose.connect(mongoUrl);
        console.log('Conectado a MongoDB - AutoPersonaDB');
    } catch (error) {
        console.log('Error de conexión a MongoDB - AutoPersonaDB:', error);
    }
};