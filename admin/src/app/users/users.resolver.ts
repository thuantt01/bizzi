import { Query, Resolver } from '@nestjs/graphql';
import { User } from '@app/users/entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  @Query(() => String)
  hello() {
    return 'user';
  }
}
