import { IsNotEmpty } from "class-validator";

export class LoginUserDTO {
    
    @IsNotEmpty({ message: 'Type your username to login.'})
    username: string;

    @IsNotEmpty({ message: 'Type your password to login.'})
    password: string;
}