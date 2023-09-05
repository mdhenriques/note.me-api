import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.entity";
import { Rating } from "../rating/rating.entity";

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

    @BelongsToMany(() => User, () => Rating)
    ratedByUsers: User[];
}