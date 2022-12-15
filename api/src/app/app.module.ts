import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from '@app/auth/auth.module';
import { dataSourceOptions } from '@db/data-source';
import { UsersModule } from '@app/users/users.module';
import { PostsModule } from '@app/posts/posts.module';
import { DataloaderModule } from '@db/loaders/dataloader.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DataloaderService } from '@db/loaders/dataloader.service';

@Module({
  imports: [
    AuthModule,
    PostsModule,
    UsersModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule],
      inject: [DataloaderService],
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/db/schema.gql'),
          context: () => ({
            loaders: dataloaderService.createLoaders(),
          }),
        };
      },
    }),
  ],
})
export class AppModule {}
