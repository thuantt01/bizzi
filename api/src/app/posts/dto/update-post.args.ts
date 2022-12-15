import { CreatePostInput } from '@app/posts/dto/create-post.input';
import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';

@ArgsType()
export class UpdatePostArgs extends PartialType(CreatePostInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;
}
