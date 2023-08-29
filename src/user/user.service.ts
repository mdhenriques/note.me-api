import { Body, Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/createUser.dto";
import { User } from "./user.entity";


@Injectable()
export class UserService {

    async create(newUser: CreateUserDTO): Promise<{ status: string, message: string}>{
        try { 
            const existingUser = await User.findOne({
                where: {
                    email: newUser.email,
                }
            })
            if (existingUser) {
                return { status: 'error', message: 'User already exists.'}
            }
            
            await User.create({newUser});

            return { status: 'success', message: 'User created successfully.'}
        } catch (err) {
            console.error('Error creating user: ', err);
            return { status: 'error', message: 'An error occurred while creating the user.'}
        }

    }
}