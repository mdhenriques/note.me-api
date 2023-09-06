
import { Column, DataType, Table, Model, BelongsToMany } from "sequelize-typescript";
import { Posts } from "src/post/post.entity";
import { Rating } from "src/rating/rating.entity";


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

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    isAdmin: boolean;    

    @BelongsToMany(() => Posts, () => Rating)
    ratedPosts: Posts[];
}