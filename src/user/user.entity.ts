import { Model } from "sequelize";
import { Column, DataType, Table } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";

@Table
export class User extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;
}