import mongoose from "mongoose";

export const conectarDB = async () => {
    try{
        
        await mongoose.connect('mongodb://127.0.0.1:27017/AutoPersonaDB');
        console.log('Conectado a MongoDB - AutoPersonaDB');
    }catch (error){
        console.log('Error de conexion a MongoDB - AutoPersonaDB: ', error);
    }
}