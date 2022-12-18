import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entities';
import { PhotoEntity } from './entities/photo.entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PhotoEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
