import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmployeesService {
  // injecting the DatabaseService 
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if(role) return this.databaseService.employee.findMany({
      where: {
        role,
      }
    });
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return `This action updates a #${id} employee`;
  }

  async remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
