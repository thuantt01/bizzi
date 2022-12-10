import { UseGuards } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { LoginUserInput } from '@src/app/auth/dto/login-user.input';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LocalAuthGuard } from '@src/app/auth/strategies/local/guard';
import { LoginUserResponse } from '@src/app/auth/dto/login-user.response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginUserResponse)
  async login(
    @Args('loginUserInput') _loginUserInput: LoginUserInput,
    @Context() { user },
  ) {
    return this.authService.login(user);
  }
}
