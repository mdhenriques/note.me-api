import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePostDTO {

    @ApiProperty({
        description: 'Id of post creator',
        type: Number
    })
    @IsNotEmpty({ message: 'Post must have a userId. '})
    userId: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'Post must have a name.'})
    title: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Post must have a description'})
    content: string;    
}