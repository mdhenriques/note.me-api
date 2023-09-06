import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.entity";
import { Rating } from "../rating/rating.entity";

@Table
export class Posts extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    content: string;

    @BelongsToMany(() => User, () => Rating)
    ratedByUsers: User[];
}