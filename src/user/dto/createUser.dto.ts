import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDTO {

    @ApiProperty({
        description: 'Username',
        type: String
    })
    @IsNotEmpty({ message: 'Username is required.'})
    username: string;

    @ApiProperty({
        description: 'Users email',
        type: String
    })
    @IsNotEmpty({ message: 'Email is required.'})
    email: string;

    @ApiProperty({
        description: 'Users password',
        type: String
    })
    @IsNotEmpty({ message: 'Password is required.'})
    password: string;
}