import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateUserArgs {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;
}
