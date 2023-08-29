import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";

@Controller('/users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() user: User): Promise<any> {
        try {
            const response = await this.userService.create(user);
            return response;
        } catch (err) {
            console.log(err);            
        }
    }
    
}