import { IsNotEmpty, Min } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignInUserInput {
  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @Min(6)
  @IsNotEmpty()
  password: string;
}
