import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  UseInterceptors,
  Res,
  Get,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { TaskUserDto } from '../dto/task.dto';
import { HeaderInterceptor } from '../../auth/interceptor/response.interceptor';
import { Response } from 'express';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(new JwtAuthGuard())
  @UseInterceptors(new HeaderInterceptor())
  @Post('/create')
  async createUserTask(
    @Request() req,
    @Body() taskUserDto: TaskUserDto,
    @Res() response: Response,
  ) {
    await this.taskService.createTask(taskUserDto, req.user.id);
    return response.send({ message: 'task created' });
  }

  @UseGuards(new JwtAuthGuard())
  @UseInterceptors(new HeaderInterceptor())
  @Get('/allTask')
  async getAllTask(@Request() req) {
    return await this.taskService.getTasks(req.user.id);
  }

  @UseGuards(new JwtAuthGuard())
  @UseInterceptors(new HeaderInterceptor())
  @Delete('/delete')
  async DeleteTask(@Query('taskId') id): Promise<{ message: string }> {
    await this.taskService.deleteTaskById(id);
    return { message: 'Task Deleted' };
  }

  @UseGuards(new JwtAuthGuard())
  @UseInterceptors(new HeaderInterceptor())
  @Patch('/update')
  async UpdateTask(
    @Query('taskId') id,
    @Body() taskUserDto: TaskUserDto,
    @Res() response: Response,
  ) {
    await this.taskService.updateTaskById(taskUserDto, id);
    return response.status(200).send({ message: 'task updated' });
  }
}
