import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { User } from '@app/users/entities/user.entity';
import { UsersService } from '@app/users/users.service';

@Injectable()
export class DataloaderService {
  constructor(private readonly usersService: UsersService) {}

  createLoaders() {
    const usersLoader = new DataLoader<number, User>(
      async (ids: readonly number[]) =>
        await this.usersService.findPostUsersByBatch(ids),
    );

    return { usersLoader };
  }
}
