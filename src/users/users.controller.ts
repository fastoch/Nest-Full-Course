import { Controller, Get, Post, Delete, Patch, Param, Body } from '@nestjs/common';

@Controller('users') 
export class UsersController {
  @Get() // GET /users
  findAll() {
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
  update(@Param('id') id: string, @Body() user: {}) {
    return { id, ...user }
  }

  @Delete(':id') // DELETE /users/:id
  remove() {
    return {}
  }
}
