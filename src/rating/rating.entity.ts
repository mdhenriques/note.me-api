import { Table, BelongsTo, Column, DataType, ForeignKey, Model } from "sequelize-typescript";
import { Posts } from "src/post/post.entity";
import { User } from "src/user/user.entity";

@Table
export class Rating extends Model {

    @Column
    value: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Posts)
    @Column
    postId: number;

    @BelongsTo(() => Posts)
    Post: Posts;
}