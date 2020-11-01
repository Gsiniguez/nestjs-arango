import { Injectable } from '@nestjs/common';
import { hash, compare } from "bcrypt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class BcryptService {

    constructor(
        private readonly config: ConfigService
    ) { }

    async hash(plain: string): Promise<string> {
        return hash(plain, Number(this.config.get<number>('HASH_ROUNDS')))
    }

    async compare(plain: string, encrypted: string): Promise<boolean> {
        return await compare(plain, encrypted);
    }
}
