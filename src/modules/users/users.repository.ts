import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import { aql, Database } from "arangojs";
import { ArangoDbRepository } from "src/arangodb/arangodb.repository";


@Injectable()
export class UsersRepository extends ArangoDbRepository {
    constructor(@Inject("ARANGODB") private readonly database: Database) {
        super("Users", database);
    }


    async findByUsername(username: string) {
        try {
            const collection = await this.getCollection()
            const cursor = await this.database.query(aql`FOR d IN ${collection} FILTER d.state == "ACTIVE" FILTER d.username == ${username} RETURN d`);
            const result = await cursor.next();
            if (!result) throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
            return result
        } catch (error) {
            return error;
        }
    }

}