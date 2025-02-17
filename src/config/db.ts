import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv"
//llamamos a la variable de entorno
dotenv.config();
//se agrega ! para que no de error de que puede ser null o undefined
//dirname es una variable global de node que nos da la ruta absoluta del archivo actual
//se le pasa el archivo actual y se le concatena la ruta de los modelos para que sequelize pueda encontrar los modelos
const db = new Sequelize(process.env.DATABASE_URL!, {
    logging:false, //Desactivar los logs de las consultas SQL en pruebas
    models: [__dirname + '/../models/**/*'],
});

export default db;