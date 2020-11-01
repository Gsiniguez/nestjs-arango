import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { UsersModule } from '../users/users.module';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  imports: [UsersModule, BcryptModule]
})
export class AuthModule { }
