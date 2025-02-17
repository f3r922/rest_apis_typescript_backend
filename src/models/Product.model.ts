import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
    tableName: "products"
})

class Product extends Model {
    @Column({
        type: DataType.STRING
    })
    declare name: string

    @Column({
        type: DataType.FLOAT
    })
    //el signo de admiración es para que no de error de que puede ser null o undefined
    declare price: number;
    
    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}

export default Product