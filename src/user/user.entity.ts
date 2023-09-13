
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model } from "sequelize-typescript";


@Table
export class User extends Model {    

    @ApiProperty({
        description: 'Username',
        type: Number
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @ApiProperty({
        description: 'Users email',
        type: String
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @ApiProperty({
        description: 'Users password',
        type: String
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @ApiProperty({
        description: 'Property responsible for checking if the user is an Admin',
        type: Boolean
    })
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    isAdmin: boolean;    

}