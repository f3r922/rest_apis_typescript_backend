import { Request, Response } from 'express'
import Product from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll(
        {
            order:[
                ['price', 'DESC']
            ],
            attributes: {exclude: ['createdAt','updatedAt']}
        }
    )
    res.json({data : products})
}

export const getProductsById = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if (!product) {
        res.status(404).json({error : 'Product not found'})
        return
    }
    res.json({data : product})
}

export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body);
    //res.json({data : product}) es para que nos muestre el producto que acabamos de guardar
    res.status(201).json({data : product});
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if (!product) {
        res.status(404).json({error : 'Product not found'})
        return
    }
    //Actualizamos el producto
    await product.update(req.body)
    //Almacenamos en la base de datos
    await product.save()
    res.json({data : product})
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if (!product) {
        res.status(404).json({error : 'Product not found'})
        return
    }

        //Actualizamos el producto
        product.availability = !product.dataValues.availability
        //Almacenamos en la base de datos
        await product.save()
        res.json({data : product}) 
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({error : 'Product not found'})
        return
    }

    await product.destroy()
    res.json({data: 'Producto Eliminado'})

}