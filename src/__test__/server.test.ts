import { connectDB } from "../server";
import db from "../config/db";

jest.mock('../config/db')

describe('connectDB', () => {
    it('should handle database connection error', async() => {
        jest.spyOn(db, 'authenticate')//se importa la conexión, espera que ocurra authenticate, con el mock hacemos una excepción para que pase por el catch
        .mockRejectedValueOnce(new Error('Hubo un error al conectar a la base de datos'))
        const consoleSpy = jest.spyOn(console, 'log') //el espia espera por la consola y lee el log

        await connectDB() //llamamos la conexion a la base de datos
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar a la base de datos')
        ) //toHaveBeenCalledWith un mock haya sido llamado con ciertos argumentos
    })
    //esperamos que el espia de la consola tenga un string con cierto texto
})