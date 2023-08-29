import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './user/user.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [DatabaseModule, UsersModule, ItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
