import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: 'ADMIN',
    },
  ]

  findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    if (role) {
      return this.users.filter(user => user.role === role)
    } 
    return this.users
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  create(user: CreateUserDto) {
    // we sort a copy of the users array in descending order based on their id
    const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id) 
    // then we build a newUser object
    const newUser = {
      // we're not connected to a database, so we need to increment the id ourselves
      id: usersByHighestId[0].id + 1,
      // finally, we merge the new id with the rest of the user data
      ...user
    }
    this.users.push(newUser)
    return newUser
  }

  update(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        // create a copy of the existing user, and overwrite it with updatedUser data
        return { ...user, ...updatedUser }
      }
      return user
    })
    return this.findOne(id)
  }

  remove(id: number) {
    const removedUser = this.findOne(id) // save the removed user before it gets deleted (filtered out)
    this.users = this.users.filter(user => user.id !== id)
    return removedUser
  }
}
