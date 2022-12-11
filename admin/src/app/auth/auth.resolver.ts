import { UseGuards } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { LoginUserInput } from '@app/auth/dto/login-user.input';
import { LocalAuthGuard } from '@app/auth/strategies/local/guard';
import { SignUpUserInput } from '@app/auth/dto/sign-up-user.input';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginUserResponse } from '@app/auth/dto/login-user.response';

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

  @Mutation(() => LoginUserResponse)
  async signUp(@Args('signUpUserInput') signUpUserInput: SignUpUserInput) {
    return this.authService.signUp(signUpUserInput);
  }
}
