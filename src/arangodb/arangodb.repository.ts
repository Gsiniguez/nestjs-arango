import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { aql, Database } from 'arangojs';
import { DocumentCollection } from 'arangojs/collection';
import { exception } from 'console';


@Injectable()
export class ArangoDbRepository {


    constructor(
        private _collection: string,
        private readonly db: Database,
    ) {
    }

    async getCollection() {
        try {
            return await this.db.collection(this._collection);
        } catch (error) {
            return error
        }
    }


    async findAll() {
        try {
            const collection = await this.getCollection()
            const cursor = await this.db.query(aql`FOR d IN ${collection} FILTER d.state == "ACTIVE" RETURN d`);
            const result = await cursor.all();
            if (!result) throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
            return result
        } catch (error) {
            return error;
        }

    }

    async findById(id: string) {
        try {
            const collection = await this.getCollection()
            const cursor = await this.db.query(aql`FOR d IN ${collection} FILTER d.state == "ACTIVE" FILTER d._key == ${id} RETURN d`);
            const result = await cursor.next();
            if (!result) throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
            return result
        } catch (error) {
            return error;
        }
    }

    async save(obj: Object) {
        try {
            const collection = await this.getCollection()
            obj["state"] = "ACTIVE";
            obj["created_at"] = new Date(Date.now() - 1620 * 60 * 1000);
            const result = await collection.save(obj, { returnNew: true });
            return result.new;
        } catch (error) {
            return error;
        }
    }

    async update(id: string, obj: Object) {
        try {
            const collection = await this.getCollection();
            const cursor = await this.db.query(aql`FOR d IN ${collection} FILTER d.state == "ACTIVE" FILTER d._key == ${id} RETURN d`);
            const document = await cursor.next();
            obj["updated_at"] = new Date(Date.now() - 1620 * 60 * 1000);
            const result = await collection.update(document, obj, { returnNew: true });
            return result.new;
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            const collection = await this.getCollection();
            const cursor = await this.db.query(aql`FOR d IN ${collection} FILTER d.state == "ACTIVE" FILTER d._key == ${id} RETURN d`);
            const document = await cursor.next();
            let obj: Object = {};
            obj["state"] = "DELETED";
            const result = await collection.update(document, obj, { returnNew: true });
            return result.new;
        } catch (error) {
            return error;
        }

    }


}