import { Injectable } from '@nestjs/common';
import { User } from '@app/users/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@app/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (user && password === user.password) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const { email, id } = user;
    return {
      user,
      token: this.jwtService.sign({ email, sub: id }),
    };
  }
}
