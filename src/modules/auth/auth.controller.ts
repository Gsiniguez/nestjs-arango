import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly usersService: UsersService
    ) { }

    @Post("register")
    async register(@Body() createUser: Object) {
        return await this.usersService.create(createUser);
    }

    @UseGuards(AuthGuard('local'))
    @Post("login")
    async login(@Request() req) {
        return req.user;
    }
}
