import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.entity";
import { ApiProperty } from "@nestjs/swagger";

enum PostStatus {
    URGENTE = 'urgente',
    BACKLOG = 'backlog',
    PENDENTE = 'pendente',
    CONCLUIDA = 'concluida',
  }



@Table
export class Posts extends Model {


    @ApiProperty({
        description: 'Id of post creator',
        type: Number
    })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @ApiProperty({
        description: 'Posts title',
        type: String
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @ApiProperty({
        description: 'Posts content',
        type: String
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    content: string;


    @ApiProperty({
        description: 'Post status',
        enum: PostStatus,
        default: PostStatus.PENDENTE,
        type: String,
    })
    @Column({
        type: DataType.ENUM(PostStatus.URGENTE, PostStatus.BACKLOG, PostStatus.PENDENTE, PostStatus.CONCLUIDA),
        defaultValue: PostStatus.PENDENTE,
        allowNull: false,
    })
    status: PostStatus;

}