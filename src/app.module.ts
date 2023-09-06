import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './user/user.module';
import { RatingModule } from './rating/rating.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [DatabaseModule, UsersModule, PostModule, RatingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
