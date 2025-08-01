import { Controller, Get, Post, Delete, Patch, Param } from '@nestjs/common';

@Controller('users') 
export class UsersController {
  @Get() // GET /users
  findAll() {
    return []
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return { id }
  }

  @Post() // POST /users
  create() {
    return {}
  }

  @Patch(':id') // PATCH /users/:id
  update() {
    return {}
  }

  @Delete(':id') // DELETE /users/:id
  remove() {
    return {}
  }
}
