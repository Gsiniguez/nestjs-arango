import { Injectable } from '@nestjs/common';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly bcryptService: BcryptService
    ) { }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findByUsername(username);
        if (user && await this.bcryptService.compare(password, user.password)) {
            const { password, ...userResponse } = user
            return userResponse;
        }

        return null;
    }
}
