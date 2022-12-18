/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class TaskUserDto {
  @IsString()
  @IsNotEmpty()
  task: string;

  @IsBoolean()
  completed: boolean;
}
