import { Router } from "express";
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator";
import  {handleInputErrors} from "./middleware";

const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The product Name
 *                      example: Samsung s24
 *                  price:
 *                      type: number
 *                      description: The product Price
 *                      example: 200
 *                  availability:
 *                      type: boolean
 *                      description: The product Availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a List of products
 *          tags:
 *              - Products
 *          description: return a list of Products
 *          responses:
 *              200:
 *                  description: Succesfull response
 *                  content:
 *                      aplication/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

//Routing
router.get('/', 
    getProducts
)
/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a Product by ID
 *          tags: 
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Successful Response
 *                  content: 
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product' 
 *              404: 
 *                  description: Not found
 *              400:
 *                  description: Bad Request - Invalid ID
 * 
 */
router.get('/:id', 
    //Validaciones
    param('id')
        .isInt().withMessage('El id debe ser un numero entero'),
    handleInputErrors,
    getProductsById
)

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Create a new Product
 *          tags:
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                                name:
 *                                     type: string
 *                                     example: 'Pocophone x7 pro'
 *                                price:
 *                                      type: number
 *                                      example: 370
 *          responses:
 *              201:
 *                  description: Successful response 
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product' 
 *              400:
 *                  description: Invalid Request - invalid input data
 *                                 
 */
router.post('/', 
    //Validaciones
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El numero es obligatorio')
        .custom((value) => value > 0 ).withMessage('El precio debe ser mayor a 0'),
    handleInputErrors,
    createProduct 
)

/**
 * @swagger
 * /api/products/{id}:
 *   put: 
 *     summary: Updates a product with user input
 *     tags: 
 *       - Products
 *     description: Returns the updated product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Pocophone x7 pro'
 *               price:
 *                 type: number
 *                 example: 370
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Successful response 
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product' 
 *       400: 
 *         description: Bad Request - Invalid ID or Invalid input data
 *       404:
 *         description: Product Not Found
 */
router.put('/:id',
    //Validaciones
    param('id')
    .isInt().withMessage('El id debe ser un numero entero'),
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El numero es obligatorio')
        .custom((value) => value > 0 ).withMessage('El precio debe ser mayor a 0'),
    body('availability')
        .isBoolean().withMessage('Valor de disponibilidad no valido'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product Availability
 *      tags:
 *          -   Products
 *      description: Returns the updated availability
 *      parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *      responses:
 *       200:
 *         description: Successful response 
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product' 
 *       400: 
 *         description: Bad Request - Invalid ID
 *       404:
 *         description: Product Not Found
 */

router.patch('/:id',
    param('id')
    .isInt().withMessage('El id debe ser un numero entero'), 
    handleInputErrors,
    updateAvailability
)
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deletes a Product by a given ID
 *     tags:
 *       - Products
 *     description: Deletes a product by its ID and returns a confirmation message.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               value: 'Producto Eliminado'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad Request - Invalid ID supplied   
 */

router.delete('/:id',
    param('id')
    .isInt().withMessage('El id debe ser un numero entero'), 
    handleInputErrors,
    deleteProduct
)

export default router;