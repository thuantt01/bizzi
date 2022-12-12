import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '@app/posts/entities/post.entity';
import { CreatePostArgs } from '@app/posts/dto/create-post.args';
import { UpdatePostArgs } from '@app/posts/dto/update-post.args';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  create(createPostArgs: CreatePostArgs) {
    const newPost = this.postRepository.create({ ...createPostArgs });

    return this.postRepository.save(newPost);
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async update(id: number, updatePostArgs: UpdatePostArgs) {
    const post = await this.findOne(id);

    return this.postRepository.save({ ...post, updatePostArgs });
  }

  async remove(id: number) {
    const post = await this.findOne(id);

    return this.postRepository.remove(post);
  }

  async findUserPost(id: number, userId: number) {
    return this.postRepository.findOneBy({ id, userId });
  }

  async findUserPosts(userId: number) {
    return this.postRepository.find({ where: { userId } });
  }
}
