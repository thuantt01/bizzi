import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@app/users/models/user.model';

@ObjectType()
export class LoginUserResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
