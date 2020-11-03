import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { from } from 'rxjs';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getUsers(@Request() req) {
    console.log(req.user);
    return this.service.findAll();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post('/')
  async createUser(@Body() body) {
    return await this.service.create(body);
  }

  @Put('/:id')
  updateUser(@Param('id') id, @Body() body) {
    return this.service.update(id, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
