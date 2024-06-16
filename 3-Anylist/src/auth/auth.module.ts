import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';


@Module( {
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy
  ],
  exports: [
    JwtModule,
    JwtStrategy,
    PassportModule,
  ],
  imports: [
    ConfigModule,

    PassportModule.register( { defaultStrategy: 'jwt' } ),

    JwtModule.registerAsync( {
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => ( {
        secret: configService.get( 'JWT_SECRET' ),
        signOptions: {
          expiresIn: '4h'
        }
      } )
    } ),

    UsersModule,
  ]
} )
export class AuthModule { }
