import { Controller, Post, Body, Get, UseGuards, Param, Delete, InternalServerErrorException, HttpException, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { CreateUserDTO } from "./dto/createUser.dto";
import { AuthGuard } from "../auth/auth.guard";
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller('/users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post('signup')
    @ApiCreatedResponse({
        description: 'User created successfully.',
        type: User
    })
    @ApiInternalServerErrorResponse({ description: 'Internal server error '})
    async createUser(@Body() user: CreateUserDTO): Promise<{ status: string, data: User }> {
        try {            
            const newUser = await this.userService.create(user);
            return { status: 'sucess', data: newUser};
        } catch (err) {            
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);      
        }
    }

    @UseGuards(AuthGuard)
    @Get('all')
    async getAll(): Promise<User[]> {
        return await this.userService.getAllUsers();
    }

    @UseGuards(AuthGuard)
    @Get(':username')
    async getUserByUsername(@Param('username') username: string): Promise<{ id: number, email: string }> {
        const user = await this.userService.findByUsername(username);

        return { id: (await user).id, email: (await user).email};
    }

    @UseGuards(AuthGuard)
    @Get('id/:id')
    async getUserById(@Param('id') id: number) {
        const user = await this.userService.findById(id);

        return { username: (await user).username, email: (await user).email };
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<string> {
        await this.userService.deleteUser(id);
        return 'User deleted succesfully';
    }
}