import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Item extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;
}