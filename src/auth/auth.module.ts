import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entities';
import { TaskEntity } from '../task/entities/task.entities';
import { JwtStrategy } from './strategy/auth.strategy';
import { LocalStrategy } from './strategy/auth.localStrategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TaskEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({}),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
