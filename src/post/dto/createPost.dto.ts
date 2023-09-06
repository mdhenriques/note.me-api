import { IsNotEmpty } from "class-validator";

export class CreatePostDTO {

    userId: number;

    @IsNotEmpty({ message: 'Post must have a name.'})
    title: string;

    @IsNotEmpty({ message: 'Post must have a description'})
    content: string;    
}