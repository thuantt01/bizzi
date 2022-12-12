import { Field, ArgsType, PartialType, Int } from '@nestjs/graphql';
import { CreatePostInput } from '@app/posts/dto/create-post.input';

@ArgsType()
export class CreatePostArgs extends PartialType(CreatePostInput) {
  @Field(() => Int)
  userId: number;
}
