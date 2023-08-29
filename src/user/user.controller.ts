import { Controller, Post, Body, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { CreateUserDTO } from "./dto/createUser.dto";
import { LoginUserDTO } from "./dto/loginUser.dto";

@Controller('/users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post('signin')
    async createUser(@Body() user: CreateUserDTO): Promise<any> {
        try {            
            const response = await this.userService.create(user);
            return response;
        } catch (err) {
            console.log(err);            
        }
    }

    @Post('login')
    async login(@Body() user: LoginUserDTO): Promise<any> {
        const response = await this.userService.login(user);
        return response;
    }
    
    @Get('all')
    async getAll(): Promise<User[]> {
        return this.userService.getAllUsers();
    }
}