import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from '@app/auth/auth.module';
import { dataSourceOptions } from '@db/data-source';
import { UsersModule } from '@app/users/users.module';
import { PostsModule } from '@app/posts/posts.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    AuthModule,
    PostsModule,
    UsersModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      debug: true,
      playground: true,
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/db/schema.gql'),
    }),
  ],
})
export class AppModule {}
