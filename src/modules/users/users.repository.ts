import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common';
import { aql, Database } from 'arangojs';
import { DocumentMetadata } from 'arangojs/documents';
import { ArangoDbRepository } from 'src/arangodb/arangodb.repository';

@Injectable()
export class UsersRepository extends ArangoDbRepository {
  constructor(@Inject('ARANGODB') private readonly database: Database) {
    super('Users', database);
  }

  async findByUsername(username: string) {
    try {
      const collection = await this.getCollection();
      const edgeCollection = await this.getCollection("Users-Roles");
      const cursor = await this.database.query(
        aql`
          FOR d IN ${collection}
          FILTER d.state == "ACTIVE" 
          FILTER d.username == ${username} 
          for v in 1..1 ANY d ${edgeCollection}
          RETURN merge(d,{roles:v.roles})
        `,
      );
      const result = await cursor.next();
      if (!result) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      return result;
    } catch (error) {
      return error;
    }
  }

  async saveUserRole(document: DocumentMetadata, args: Object) {
    try {
      const relCollection = await this.getCollection('Roles');
      const edge = await this.getCollection('Users-Roles');
      const rol = await relCollection.save(args, { returnNew: true });
      const relation = await edge.save(
        {
          _from: document._id,
          _to: rol.new._id,
        },
        { returnNew: true },
      );

      return rol.new;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

}
