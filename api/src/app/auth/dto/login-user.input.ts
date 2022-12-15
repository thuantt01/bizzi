import { IsNotEmpty, Min } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @Min(6)
  @IsNotEmpty()
  password: string;
}
