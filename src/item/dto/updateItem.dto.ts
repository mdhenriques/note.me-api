import { IsNotEmpty } from "class-validator";

export class UpdateItemDTO {
    @IsNotEmpty({ message: 'Item must have a name.'})
    name: string;

    @IsNotEmpty({ message: 'Item must have a description'})
    description: string;   
}