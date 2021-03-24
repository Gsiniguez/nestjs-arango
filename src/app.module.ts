import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ArangodbModule } from './arangodb/arangodb.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { ConfigModule } from "@nestjs/config";
import { PersonModule } from './modules/person/person.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.development.env', '.env']
    }),
    UsersModule, AuthModule, ArangodbModule, BcryptModule, PersonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
