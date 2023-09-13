import { Body, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/createUser.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

    async create(newUser: CreateUserDTO): Promise<User>{
        try {                  
            const saltOrRounds = 10;
            newUser.password = await bcrypt.hash(newUser.password, saltOrRounds);
            return await User.create({...newUser});

            
        } catch (err) {            
            console.error('Error creating user: ', err);
            
        }
    }
    
    async getAllUsers(): Promise<User[]> {
        return User.findAll({
            attributes: ['id', 'username', 'email']
        });
    }

    async findByUsername(username: string): Promise<User | undefined> {
        const user = await User.findOne({
            where: {
                username: username
            }
        });

        if (!user) {
            throw new NotFoundException('User not found.')
        }

        return user;
    }

    async findById(id: number): Promise<User | undefined> {
        const user = await User.findByPk(id);

        if (!user) {
            throw new NotFoundException('User not found.')
        }

        return user;
    }

    async deleteUser(id: number) {
        try {
            (await this.findById(id)).destroy();
        } catch (err) {
            console.error(err);
        }
    }
}