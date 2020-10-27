import { Inject, Injectable, Scope } from "@nestjs/common";
import { Database } from "arangojs";
import { ArangoDbRepository } from "src/arangodb/arangodb.repository";


@Injectable()
export class UsersRepository extends ArangoDbRepository {
    constructor(@Inject("ARANGODB") private readonly database: Database) {
        super("Users", database);
    }
    
    
}