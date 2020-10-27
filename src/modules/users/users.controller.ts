import { Body, Controller, Delete, Get, Param, Post, Put, Query, } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly service: UsersService
    ) { }

    @Get("/")
    getUsers() {
        return this.service.findAll();
    }

    @Get("/:id")
    getUserById(@Param("id") id: string) {
        return this.service.findById(id);
    }

    @Post("/")
    createUser(@Body() body) {
        return this.service.create(body);
    }

    @Put("/:id")
    updateUser(@Param("id") id, @Body() body) {
        return this.service.update(id, body);
    }

    @Delete("/:id")
    deleteUser(@Param("id") id: string) {
        return this.service.delete(id);
    }


}
