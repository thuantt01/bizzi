import { Repository, In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/users/entities/user.entity';
import { CreateUserArgs } from '@app/users/dto/create-user.args';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findPostUsersByBatch(ids: readonly number[]) {
    return this.userRepository.findBy({ id: In(ids) });
  }

  async create(createUserArgs: CreateUserArgs) {
    const newUser = this.userRepository.create(createUserArgs);

    return this.userRepository.save(newUser);
  }
}
