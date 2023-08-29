import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
