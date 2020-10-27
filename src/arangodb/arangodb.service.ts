import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { aql, CollectionType, Database } from 'arangojs';
import { DocumentCollection, EdgeCollection } from 'arangojs/collection';
import { ArrayCursor } from 'arangojs/cursor';
import { UserScheme, RoleScheme } from './arangodb.schemes';

@Injectable()
export class ArangoDbService implements OnModuleInit {

    Roles: DocumentCollection
    Users: DocumentCollection
    UsersRoles: EdgeCollection

    constructor(
        @Inject("ARANGODB") private readonly db: Database
    ) { }

    async onModuleInit() {

        this.Roles = await this.db.collection("Roles");
        if (!await this.Roles.exists()) await this.Roles.create({ type: CollectionType.DOCUMENT_COLLECTION, schema: RoleScheme });

        this.Users = await this.db.collection("Users");
        if (!await this.Users.exists()) await this.Users.create({ type: CollectionType.DOCUMENT_COLLECTION, schema: UserScheme });

        this.UsersRoles = await this.db.collection("Users-Roles")
        if (!await this.UsersRoles.exists()) await this.UsersRoles.create({ type: CollectionType.EDGE_COLLECTION })

    }
}