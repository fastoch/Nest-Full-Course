import { Injectable } from '@nestjs/common';

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

  findAllInterns(role: 'INTERN') {
    return this.users.filter(user => user.role === role)
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  create(user: { name: string, email: string, role: 'INTERN' | 'ADMIN' | 'ENGINEER' }) {
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

  update(id: number, updatedUser: { name?: string, email?: string, role?: 'INTERN' | 'ADMIN' | 'ENGINEER' }) {
    const user = this.findOne(id)
    if (updatedUser.name) {
      user.name = updatedUser.name
    }
    if (updatedUser.email) {
      user.email = updatedUser.email
    }
    if (updatedUser.role) {
      user.role = updatedUser.role
    }
    return user
  }

  remove(id: string) {

  }
}
