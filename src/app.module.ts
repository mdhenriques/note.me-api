import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [DatabaseModule, UsersModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
