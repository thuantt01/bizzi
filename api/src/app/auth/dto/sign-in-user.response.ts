import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@app/users/entities/user.entity';

@ObjectType()
export class SignInUserResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
