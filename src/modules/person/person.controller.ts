import { Controller, Get, Inject } from '@nestjs/common';
import { Database } from 'arangojs';
import { PersonBuilder } from './person.model';

@Controller('person')
export class PersonController {
    constructor(@Inject("ARANGODB") private readonly database: Database) {
    }

    @Get("/")
    async get() {
        const person = new PersonBuilder(this.database)
        await person.find("4169317")
        return person.getDocument()
    }

    async createPerson() {
        const person = new PersonBuilder(this.database)
            .setFirstName("Gonzalo")
            .setLastName("Iniguez")
            .setAge(26)
        const { document, model } = await person.save()
        return document
    }
}
