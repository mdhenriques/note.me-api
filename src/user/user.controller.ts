import { Controller, Post, Body, Get, UseGuards, Param, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { CreateUserDTO } from "./dto/createUser.dto";
import { AuthGuard } from "../auth/auth.guard";
import { Rating } from "../rating/rating.entity";

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

    @Get(':userId/ratings')
    async getUserRatings(@Param('userId') userId: number): Promise<Rating[]> {
        return this.userService.getUserRatings(userId);
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