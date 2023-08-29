import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from 'src/user/dto/loginUser.dto';
import { AuthGuard } from './auth.guard';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    signIn(@Body() signInDto: LoginUserDTO) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }   
}
