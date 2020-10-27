import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ArangodbModule } from './arangodb/arangodb.module';

@Module({
  imports: [UsersModule, AuthModule, ArangodbModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
