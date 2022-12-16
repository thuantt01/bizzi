import { UseGuards } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { LocalAuthGuard } from '@app/auth/strategies/local/guard';
import { SignUpUserInput } from '@app/auth/dto/sign-up-user.input';
import { SignInUserInput } from '@app/auth/dto/sign-in-user.input';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SignInUserResponse } from '@app/auth/dto/sign-in-user.response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => SignInUserResponse)
  async signIn(
    @Args('signInUserInput') signInUserInput: SignInUserInput,
    @Context() context,
  ) {
    return this.authService.signIn(context.user);
  }

  @Mutation(() => SignInUserResponse)
  async signUp(@Args('signUpUserInput') signUpUserInput: SignUpUserInput) {
    return this.authService.signUp(signUpUserInput);
  }
}
