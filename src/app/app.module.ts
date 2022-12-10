import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from '@app/auth/auth.module';
import { UsersModule } from '@app/users/users.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      debug: false,
      playground: true,
      driver: ApolloDriver,
      autoSchemaFile: './schema.gql',
    }),
    // TypeOrmModule.forRoot({
    //   port: 5432,
    //   type: 'postgres',
    //   host: 'localhost',
    //   synchronize: false,
    //   username: '',
    //   password: '',
    //   database: '',
    //   entities: ['dist/**/*.model.js'],
    // }),
  ],
})
export class AppModule {}
