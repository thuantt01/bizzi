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

  private take = 12;

  create(createPostArgs: CreatePostArgs) {
    const newPost = this.postRepository.create({ ...createPostArgs });

    return this.postRepository.save(newPost);
  }

  findAll(page: number, take = this.take) {
    const skip = (page - 1) * take;

    return this.postRepository.find({ take, skip });
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async update(id: number, { userId, ...updatePostArgs }: UpdatePostArgs) {
    const post = await this.postRepository.findOneBy({ id, userId });

    return this.postRepository.save({ ...post, ...updatePostArgs });
  }

  async remove(id: number, userId: number) {
    const post = await this.postRepository.findOneBy({ id, userId });

    return this.postRepository.remove(post);
  }

  async findUserPost(id: number, userId: number) {
    return this.postRepository.findOneBy({ id, userId });
  }

  async findUserPosts(page: number, userId: number, take = this.take) {
    const skip = (page - 1) * take;

    return this.postRepository.find({ where: { userId }, take, skip });
  }

  async totalPage(userId: number) {
    const totalCount = await this.postRepository.count({ where: { userId } });

    return Math.ceil((+totalCount || 0) / this.take);
  }
}
