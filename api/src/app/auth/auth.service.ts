import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '@app/users/entities/user.entity';
import { UsersService } from '@app/users/users.service';
import { SignUpUserInput } from '@app/auth/dto/sign-up-user.input';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    const currentPassword = user?.password || '';
    const isMatch = await compare(password, currentPassword);

    return isMatch ? user : null;
  }

  async login(user: User) {
    const { email, id } = user;

    return {
      user,
      token: this.jwtService.sign({ email, sub: id }),
    };
  }

  async signUp(signUpUserInput: SignUpUserInput) {
    const user = await this.usersService.create(signUpUserInput);

    const { email, id } = user;

    return {
      user,
      token: this.jwtService.sign({ email, sub: id }),
    };
  }
}
