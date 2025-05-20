import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://user123:5udMTL9yFqT4iBDZ@cluster-events.y30g8jn.mongodb.net/?retryWrites=true&w=majority&appName=cluster-events',
    ),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
