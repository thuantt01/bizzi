import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@app/users/users.module';
import { User } from '@app/users/entities/user.entity';
import { Post } from '@app/posts/entities/post.entity';
import { DataloaderService } from '@db/loaders/dataloader.service';

@Module({
  exports: [DataloaderService],
  providers: [DataloaderService],
  imports: [UsersModule, TypeOrmModule.forFeature([User, Post])],
})
export class DataloaderModule {}
