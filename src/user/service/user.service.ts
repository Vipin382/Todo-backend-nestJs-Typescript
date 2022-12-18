import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entities';
import { PhotoEntity } from '../entities/photo.entities';
import { UserCredentialDto } from '../dto/user.dto';
import { UserUpdateInterface } from '../types/user.interface';
import { photoUpdateInterface } from '../types/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(PhotoEntity)
    private photoRepository: Repository<PhotoEntity>,
  ) {}

  async createUser(userCredentialDto: UserCredentialDto, file) {
    const { username, password } = userCredentialDto;
    const user = this.userRepository.create({
      username,
      password,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '12196') {
        throw new ConflictException('User Already Exist');
      }
      console.log(error);
      throw new Error('User Not Created');
    }
    const pic = {
      title: `${user.username}`,
      profile: file.buffer.toString('base64'),
      userId: user.id,
      type: file.mimetype,
    };
    const photo = this.photoRepository.create(pic);
    try {
      await this.photoRepository.save(photo);
    } catch (error) {
      throw new Error('Photo Not Created');
    }
    return user;
  }

  async getAll(id: string): Promise<UserEntity> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.tasks', 'tasks')
      .where('user.id = :userId', { userId: id })
      .getOne();
  }

  async updateUserNameById(
    userUpdateInterface: UserUpdateInterface,
  ): Promise<{ message: 'Username Updated' }> {
    try {
      await this.userRepository.update(userUpdateInterface.id, {
        username: userUpdateInterface.username,
      });
      return { message: 'Username Updated' };
    } catch (error) {
      console.log(error);
    }
  }
  async updateUserPhotoById(
    userUpdateInterface: photoUpdateInterface,
    file: Express.Multer.File,
  ): Promise<{ message: 'Username Updated' }> {
    try {
      await this.photoRepository.update(userUpdateInterface.id, {
        profile: file.buffer.toString('base64'),
        type: file.mimetype,
      });
      return { message: 'Username Updated' };
    } catch (error) {
      console.log(error);
    }
  }

  async updateVideo(userVideoUpdate: {
    url: string;
    type: string;
    id: string;
  }) {
    try {
      await this.photoRepository
        .createQueryBuilder('video')
        .where('video.userId=:videoId', { videoId: userVideoUpdate.id })
        .update({
          videoUrl: userVideoUpdate.url,
          videoType: userVideoUpdate.type,
        });
    } catch (error) {
      console.log(error);
    }
  }
}
