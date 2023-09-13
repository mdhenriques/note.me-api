import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePostDTO {

    @ApiProperty({
        description: 'Id of post creator',
        type: Number
    })
    @IsNotEmpty({ message: 'Post must have a userId. '})
    userId: number;

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
}