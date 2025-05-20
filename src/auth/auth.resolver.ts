import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { SignInInput } from './dto/sign-in.input';
import { UserGraphQL } from 'src/users/dto/user-graphql.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => String) // Retorna el token como string
  async login(
    @Args('identifier') identifier: string, // El identificador puede ser username o email
    @Args('password') password: string,
  ): Promise<string> {
    const result = await this.authService.signIn(identifier, password);
    return result.access_token;
  }

  @Query(() => UserGraphQL)
    async profile(@Context() context): Promise<UserGraphQL> {
    return context.req.user; 
  }
}
