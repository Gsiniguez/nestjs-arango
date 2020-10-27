import { Inject, Injectable } from '@nestjs/common';
import { ArangoDbRepository } from 'src/arangodb/arangodb.repository';
import { ArangoDbService } from 'src/arangodb/arangodb.service';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

    constructor(
        private readonly userRepo: UsersRepository
    ) { }

    findAll() {
        return this.userRepo.findAll()
    }

    findById(id: string) {
        return this.userRepo.findById(id);
    }

    create(obj: Object) {
        return this.userRepo.save(obj);
    }

    update(id: string, obj: Object) {
        return this.userRepo.update(id, obj);
    }

    delete(id: string) {
        return this.userRepo.delete(id);
    }
}
