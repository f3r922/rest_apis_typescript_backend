import express from 'express';
import router from './routes';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import db from './config/db';
import colors from 'colors';
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'

//Conectar a la base de datos
export async function connectDB() {
    try {
        await db.authenticate();
        //cuando creamos las tablas, modelamos los datos o hacemos cambios en la base de datos
        db.sync();
        //console.log(colors.blue('Conectado a la base de datos'));
    } catch (error) {
        //console.log(error);
        console.log(colors.red.bold('Hubo un error al conectar a la base de datos'));
    }
}

connectDB()
//Instanciar express
const server = express();
//Permitirt conexiones
const corsOptions : CorsOptions = {
    //origin es quien me envia la peticion, callback-permite o deniega la peticion
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}
//
server.use(cors(corsOptions))
//leer datos de formularios
server.use(express.json());

server.use(morgan('dev'))

server.use('/api/products', router)

//DOCS
server.use( '/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions) )

export default server;

