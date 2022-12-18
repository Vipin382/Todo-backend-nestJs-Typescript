import { Module } from '@nestjs/common';
import { TaskController } from './controller/task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entities';
import { TaskService } from './service/task.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), AuthModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
