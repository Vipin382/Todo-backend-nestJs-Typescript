import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
  Patch,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserCredentialDto } from '../dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Query,
  Res,
  UploadedFile,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEntity } from '../entities/user.entities';
import { HeaderInterceptor } from '../../auth/interceptor/response.interceptor';
import { Response } from 'express';
import { userUpdateBodyInterface } from '../types/user.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(new HeaderInterceptor())
  @Post('create')
  async Signup(
    @Body() userCredentialDto: UserCredentialDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
  ) {
    await this.userService.createUser(userCredentialDto, file);
    return response.status(200).send({ message: 'User Created' });
  }

  @UseGuards(new JwtAuthGuard())
  @Get('all')
  async getAll(@Request() req): Promise<UserEntity> {
    const data = await this.userService.getAll(req.user.id);
    return data;
  }

  @UseGuards(new JwtAuthGuard())
  @Patch('/updateUser')
  async updateUsername(
    @Query('userId') id,
    @Body()
    userUpdate: userUpdateBodyInterface,
  ) {
    const data = this.userService.updateUserNameById({
      id: id,
      username: userUpdate.username,
    });
    return data;
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(new JwtAuthGuard())
  @Patch('/updatePhoto')
  async updatePhoto(
    @Query('photoId') id,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data = this.userService.updateUserPhotoById({ id: id }, file);
    return data;
  }

  @UseGuards(new JwtAuthGuard())
  @Patch('/updateVideo')
  async updateVideoUrl(
    @Query('videoId') id,
    @Body() videoDto: { url: string; type: string },
  ) {
    await this.userService.updateVideo({
      url: videoDto.url,
      type: videoDto.type,
      id: id,
    });
    return { message: 'Video Updated' };
  }
}
