import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserArgs {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;
}
