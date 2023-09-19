import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InvalidUsernameException, InvalidPasswordException } from './auth.exceptions';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(username: string, password: string): Promise<any> {
    const existingUser = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!existingUser) {
      throw new InvalidUsernameException();
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      throw new InvalidPasswordException();
    }

    const payload = { id: existingUser.id, isAdmin: await existingUser.isAdmin };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
