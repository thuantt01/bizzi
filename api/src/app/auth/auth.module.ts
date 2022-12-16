import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '@app/auth/auth.service';
import { UsersModule } from '@app/users/users.module';
import { AuthResolver } from '@app/auth/auth.resolver';
import { JwtStrategy } from '@app/auth/strategies/jwt/strategy';
import { LocalStrategy } from '@app/auth/strategies/local/strategy';

import 'dotenv/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.APP_KEY,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, AuthResolver, JwtStrategy],
})
export class AuthModule {}
