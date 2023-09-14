import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ExtractUserIdMiddleware } from './middlewares/jwt.middleware';

@Module({
  imports: [DatabaseModule, UsersModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExtractUserIdMiddleware).forRoutes('posts')
  }
}
