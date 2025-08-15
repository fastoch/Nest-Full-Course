import { Controller, Get, Post, Delete, Patch, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') 
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users or /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER' ) {
    return this.usersService.findAll(role)
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {  // id is a route parameter, hence the @Param decorator
    return this.usersService.findOne(id) // +id converts the string id to a number
  }

  @Post() // POST /users
  create(@Body() user: { "name": string, "email": string, "role": "INTERN" | "ADMIN" | "ENGINEER"}) {
    return this.usersService.create(user)
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id', ParseIntPipe) id: number, @Body() userUpdate: {"name"?: string, "email"?: string, "role"?: "INTERN" | "ADMIN" | "ENGINEER"}) {
    return this.usersService.update(id, userUpdate)
  }

  @Delete(':id') // DELETE /users/:id
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id)
  }
}
