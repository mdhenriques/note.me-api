import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

enum PostStatus {
    URGENTE = 'urgente',
    BACKLOG = 'backlog',
    PENDENTE = 'pendente',
    CONCLUIDA = 'concluida',
  }


export class UpdatePostDTO {
        

    @IsNotEmpty()
    status: PostStatus;

    @ApiProperty({
        description: 'Posts title',
        type: String
    })
    @IsNotEmpty({ message: 'Post must have a title.'})
    title: string;

    @ApiProperty({
        description: 'Posts content',
        type: String
    })
    @IsNotEmpty({ message: 'Post must have a description'})
    content: string;   
}