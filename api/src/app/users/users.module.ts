import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/users/entities/user.entity';
import { UsersService } from '@app/users/users.service';
import { UsersResolver } from '@app/users/users.resolver';

@Module({
  exports: [UsersService],
  providers: [UsersResolver, UsersService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
