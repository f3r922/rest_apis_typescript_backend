import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    //validationResult(req) es una funcion que nos da express-validator para obtener los errores de validacion
    //si hay errores, validationResult(req) nos devuelve un array con los errores
    //si no hay errores, validationResult(req) nos devuelve un objeto vacio
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return 
    }
    next()
}