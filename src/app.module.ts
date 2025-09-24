import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule, 
    DatabaseModule, 
    EmployeesModule,
    // configuring rate limiting (recommended for a public API)
    ThrottlerModule.forRoot([{
      // max 3 requests per second
      name: 'short',
      ttl: 1000, 
      limit: 3, 
    },{
      // max 50 requests per minute
      name: 'long',
      ttl: 60000, 
      limit: 50,
    }])
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class AppModule {}
