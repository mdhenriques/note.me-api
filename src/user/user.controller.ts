import { Controller, Post, Body, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { CreateUserDTO } from "./dto/createUser.dto";
import { LoginUserDTO } from "./dto/loginUser.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('/users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post('signup')
    async createUser(@Body() user: CreateUserDTO): Promise<any> {
        try {            
            const response = await this.userService.create(user);
            return response;
        } catch (err) {
            console.log(err);            
        }
    }
    
    @UseGuards(AuthGuard)
    @Get('all')
    async getAll(): Promise<User[]> {
        return this.userService.getAllUsers();
    }
}