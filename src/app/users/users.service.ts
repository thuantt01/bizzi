import { Injectable } from '@nestjs/common';
import { User } from '@app/users/models/user.model';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      email: 'thuantt01',
      password: 'not-secure',
    },
    {
      id: 2,
      email: 'thuantt02',
      password: 'not-secure',
    },
  ];

  async findAll() {
    return this.users;
  }

  async findOne(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
}
