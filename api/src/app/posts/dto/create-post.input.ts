import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Max } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @Max(255)
  @IsNotEmpty()
  title: string;

  @Field()
  @Max(5000)
  @IsNotEmpty()
  content: string;
}
