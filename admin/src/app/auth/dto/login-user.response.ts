import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@app/users/entities/user.entity';

@ObjectType()
export class LoginUserResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
