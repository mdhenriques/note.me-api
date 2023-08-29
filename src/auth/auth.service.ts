import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) {}

    async signIn(username: string, password: string): Promise<any> {
        const existingUser = User.findOne({
            where: {
                username: username,
            },
        });

        if(!existingUser) {
            return 'Invalid username.'
        }

        const validPassword = await bcrypt.compare(password, (await existingUser).password);
        if(!validPassword) {
            return 'Invalid password.'
        }

        const payload = { username: (await existingUser).username, isAdmin: (await existingUser).isAdmin};
        return {
            access_token: await this.jwtService.signAsync(payload)
        };

    }
}
