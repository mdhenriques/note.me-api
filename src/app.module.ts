import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './user/user.module';
import { ItemModule } from './post/item.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [DatabaseModule, UsersModule, ItemModule, RatingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
