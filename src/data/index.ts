import { exit } from 'node:process'
import db from '../config/db'

const clearDB = async () => {
    try {
        await db.sync({force:true})
        console.log('Datos eliminados correctamente')
        //colocamos 0 ya que termino correctamente
        exit(0)
    } catch (error) {
        console.log(error)
        //colocamos 1,por que termina en error
        exit(1)
    }
}

//process.arg es un comando de cli de nodejs que se ejecuta y 2 es la posicion
if(process.argv[2] === '--clear'){
    clearDB()
}