import {
  Int,
  Args,
  Query,
  Parent,
  Context,
  Resolver,
  Mutation,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from '@app/users/entities/user.entity';
import { Post } from '@app/posts/entities/post.entity';
import { PostsService } from '@app/posts/posts.service';
import { JwtAuthGuard } from '@app/auth/strategies/jwt/guard';
import { CreatePostInput } from '@app/posts/dto/create-post.input';
import { UpdatePostInput } from '@app/posts/dto/update-post.input';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @ResolveField('user', () => User)
  getUser(@Parent() post: Post, @Context() { loaders }) {
    return loaders.usersLoader.load(post.userId);
  }

  @Query(() => Int, { name: 'totalPage' })
  totalPage(@Context() { req }) {
    return this.postsService.totalPage(req.user?.id);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll(@Args('page', { type: () => Int }) page: number) {
    return this.postsService.findAll(page);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Post])
  userPosts(
    @Args('page', { type: () => Int }) page: number,
    @Context() { req },
  ) {
    return this.postsService.findUserPosts(page, req.user.id);
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Post)
  userPost(@Args('id', { type: () => Int }) id: number, @Context() { req }) {
    return this.postsService.findUserPost(id, req.user.id);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context() { req },
  ) {
    return this.postsService.create({
      ...createPostInput,
      userId: req.user.id,
    });
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @Context() { req },
  ) {
    return this.postsService.update(updatePostInput.id, {
      ...updatePostInput,
      userId: req.user.id,
    });
  }

  @Mutation(() => Int)
  @UseGuards(JwtAuthGuard)
  removePost(@Args('id', { type: () => Int }) id: number, @Context() { req }) {
    this.postsService.remove(id, req.user.id);

    return id;
  }
}
