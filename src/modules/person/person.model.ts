import { Inject } from "@nestjs/common";
import { aql, Database } from "arangojs";
import { CollectionType, DocumentCollection } from "arangojs/collection";
import { DocumentMetadata } from "arangojs/documents";


export class PersonBuilder {
    //ARANGODB REFERENCE
    private database: Database
    private collection: DocumentCollection

    //Atributos
    private attributes = {
        _key: undefined,
        firstName: "",
        lastName: "",
        age: 0
    }

    private attributesArray = []

    constructor(database: Database) {
        this.database = database
        this.collection = database.collection("Person")
    }

    //SETTERS
    setKey(_key: string) {
        this.attributes._key = _key
        return this
    }

    setFirstName(firstName: string) {
        this.attributes.firstName = firstName
        return this
    }

    setLastName(lastName: string) {
        this.attributes.lastName = lastName
        return this
    }

    setAge(age: number) {
        this.attributes.age = age
        return this
    }

    getDocument() {
        return this.attributes
    }

    getDocumentArray() {
        return this.attributes
    }

    //DATABASE FUNCTIONS
    async find(_key: string) {
        const cursor = await this.database.query(
            aql`FOR e IN ${this.collection} FILTER e._key == ${_key} RETURN e`,
        );
        const result = await cursor.next();
        this.setFirstName(result.firstName)
            .setLastName(result.lastName)
            .setAge(result.age)
            .setKey(result._key)
        return this
    }

    async findAll() {
        const cursor = await this.database.query(
            aql`FOR e IN ${this.collection} RETURN e`,
        );
        const result = await cursor.all();
        
        return this
    }

    async save(): Promise<{
        document: DocumentMetadata & {
            new?: any;
        };
        model: PersonBuilder;
    }> {
        const document = await this.collection.save(this.attributes)
        const model = this
        return { document, model }
    }

    //UTILITIES
    private setAttributes() {

    }
}