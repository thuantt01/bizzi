import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@app/users/users.module';
import { Post } from '@app/posts/entities/post.entity';
import { PostsService } from '@app/posts/posts.service';
import { PostsResolver } from '@app/posts/posts.resolver';

@Module({
  providers: [PostsResolver, PostsService],
  imports: [UsersModule, TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
