import { Controller, Get, Post, Delete, Patch, Param, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') 
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users or /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER' ) {
    return []
  }

  @Get('interns') // GET /users/interns
  findAllInterns() {
    return []
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {  // id is a route parameter, hence the @Param decorator
    return { id }
  }

  @Post() // POST /users
  create(@Body() user: {}) {
    return user
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id') id: string, @Body() userUpdate: {}) {
    return { id, ...userUpdate } // merge the id and userUpdate data into a new object
  }

  @Delete(':id') // DELETE /users/:id
  remove(@Param('id') id: string) {
    return { id }
  }
}
