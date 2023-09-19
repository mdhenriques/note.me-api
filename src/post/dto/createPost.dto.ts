import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePostDTO {    

    @ApiProperty({
        description: 'Posts title',
        type: String
    })
    @IsNotEmpty({ message: 'Post must have a name.'})
    title: string;

    @ApiProperty({
        description: 'Posts content',
        type: String
    })
    @IsNotEmpty({ message: 'Post must have a description'})
    content: string;    



    @ApiProperty({
        description: 'Post status',
        type: String
    })
    @IsNotEmpty({ message: 'Post must have a status'})
    status: string;
}