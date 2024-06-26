import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';


@Resolver( () => User )
export class UsersResolver {

  constructor(
    private readonly usersService: UsersService
  ) { }

  @Query( () => [ User ], { name: 'users' } )
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query( () => User, { name: 'user' } )
  findOne( @Args( 'id', { type: () => ID } ) id: string ): Promise<User> {
    //  TODO:
    throw new Error( 'No implementend' );
  }

  @Mutation( () => User )
  blockUser( @Args( 'id', { type: () => ID } ) id: string ): Promise<User> {
    return this.usersService.block( id );
  }
}
