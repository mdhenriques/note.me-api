import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { CreateUserDTO } from "./dto/createUser.dto";

@Controller('/users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() user: CreateUserDTO): Promise<any> {
        try {

            console.log(user);
            const response = await this.userService.create(user);
            return response;
        } catch (err) {
            console.log(err);            
        }
    }    
}