import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UpdateUserInput } from './dto/update-user.input';
import { SignupInput } from '../auth/dto/inputs/signup.input';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {

  private logger: Logger = new Logger( 'UsersService' );

  constructor(
    @InjectRepository( User )
    private readonly usersRepository: Repository<User>
  ) { }

  async create( signupInput: SignupInput ): Promise<User> {
    try {

      const newUser = this.usersRepository.create( {
        ...signupInput,
        password: bcrypt.hashSync( signupInput.password, 10 )
      } );

      return await this.usersRepository.save( newUser );
    } catch ( error ) {
      this.handleDBErrors( error );
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async findOneByEmail( email: string ): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail( { email } );
    } catch ( error ) {
      this.handleDBErrors( {
        code: 'error-001',
        detail: `${ email } not found.`
      } );
    }
  }

  update( id: number, updateUserInput: UpdateUserInput ) {
    return `This action updates a #${ id } user`;
  }

  block( id: string ): Promise<User> {
    throw new Error( `block method not implemented` );
  }

  private handleDBErrors( error: any ): never {

    if ( error.code === '23305' ) {
      throw new BadRequestException( error.detail.replace( 'Key', '' ) );
    }

    if ( error.code == 'error-001' ) {
      throw new BadRequestException( error.detail.replace( 'Key', '' ) );
    }

    this.logger.error( error );

    throw new InternalServerErrorException( 'Please check server logs.' );
  }
}
