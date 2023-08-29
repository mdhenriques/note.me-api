import { IsNotEmpty } from "class-validator";

export class CreateUserDTO {

    
    @IsNotEmpty({ message: 'Username is required.'})
    username: string;

    @IsNotEmpty({ message: 'Email is required.'})
    email: string;

    @IsNotEmpty({ message: 'Password is required.'})
    password: string;
}