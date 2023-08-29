import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from 'src/user/dto/loginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    signIn(@Body() signInDto: LoginUserDTO) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
}
