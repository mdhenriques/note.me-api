import { IsNotEmpty } from "class-validator";

export class UpdatePostDTO {
    @IsNotEmpty({ message: 'Item must have a name.'})
    title: string;

    @IsNotEmpty({ message: 'Item must have a description'})
    content: string;   
}