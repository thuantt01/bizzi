import { Module } from '@nestjs/common';
import { UsersService } from '@app/users/users.service';
import { UsersResolver } from '@app/users/users.resolver';

@Module({
  exports: [UsersService],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
