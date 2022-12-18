import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entities';
import { Repository } from 'typeorm';
import { TaskUserDto } from '../dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(taskUserDto: TaskUserDto, id: string): Promise<TaskEntity> {
    const task = this.taskRepository.create(taskUserDto);
    try {
      await this.taskRepository.save({ ...task, userId: id });
      return task;
    } catch (error) {
      console.log(error);
      throw new Error('Task Not Created Error');
    }
  }

  async getTasks(id: string): Promise<TaskEntity[]> {
    return await this.taskRepository
      .createQueryBuilder('all')
      .where('all.userId = :allId', { allId: id })
      .getMany();
  }

  async deleteTaskById(id: string) {
    try {
      const data = await this.taskRepository.delete({ id: id });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateTaskById(taskUserDto: TaskUserDto, id: string) {
    try {
      await this.taskRepository.update(id, {
        task: taskUserDto.task,
        completed: taskUserDto.completed,
      });
    } catch (error) {
      throw new ConflictException('User Not Updated');
    }
  }
}
