
import { Column, DataType, Table, Model } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";

@Table
export class User extends Model {    

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