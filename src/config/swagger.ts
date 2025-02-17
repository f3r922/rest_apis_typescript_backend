import swaggerJSdoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSdoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'Api operations related to products'
            }
        ],
        info: {
            title: 'Rest Api Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'API Docs for Products'
        },
    },
    apis: ['./src/routes.ts']
    
}
const swaggerSpec = swaggerJSdoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url('https://unblast.com/wp-content/uploads/2022/08/Programmer-Illustration-1536x1025.jpg');
            height: auto;
            width: auto;
        }
        .swagger-ui .topbar {
        background-color :rgb(6, 83, 131);
        }
    `,
    customSiteTitle: 'Documentacion REST API Express / TypeScript'
}
export default swaggerSpec
export {
    swaggerUiOptions
}

