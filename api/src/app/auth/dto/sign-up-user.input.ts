import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Min, Max, IsNotEmpty } from 'class-validator';

@InputType()
export class SignUpUserInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @Min(6)
  @Max(20)
  @IsNotEmpty()
  password: string;
}
