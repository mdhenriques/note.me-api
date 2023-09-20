import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';


@Module({
  controllers: [UserController],
  imports: [AuthModule],
  providers: [UserService]
})
export class UsersModule {}