import { IsNotEmpty } from "class-validator";

export class UpdatePostDTO {
    @IsNotEmpty({ message: 'Post must have a name.'})
    title: string;

    @IsNotEmpty({ message: 'Post must have a description'})
    content: string;   
}