import { User } from '@app/users/models/user.model';
import { UsersService } from '@app/users/users.service';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  fineOne(@Args('email') email: string) {
    return this.usersService.findOne(email);
  }
}
