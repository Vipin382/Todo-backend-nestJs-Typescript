/* eslint-disable prettier/prettier */
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../user/entities/user.entities';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  async validateUser(authCredentialDto: AuthCredentialDto) {
    const user = await this.userRepository.findOne({
      where: { username: authCredentialDto.username },
    });
    if (
      user &&
      (await bcrypt.compare(authCredentialDto.password, user.password))
    ) {
      return user;
    }
  }

  async getToken(
    id: string,
    username: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: id,
          username: username,
        },
        {
          secret: 'todolist',
          expiresIn: '1h',
        },
      ),
      this.jwtService.signAsync(
        {
          id: id,
          username: username,
        },
        {
          secret: 'vipin',
          expiresIn: '1d',
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async validateRefreshToken(token: string) {
    const validated = await this.jwtService.verify(token, {
      publicKey: 'vipin',
    });
    if (validated) {
      const accessToken = await this.jwtService.signAsync(
        {
          id: validated.id,
          username: validated.username,
        },
        {
          secret: 'todolist',
          expiresIn: '1h',
        },
      );
      return { accessToken: accessToken };
    }
  }

  async loginUser(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.userRepository.findOne({
      where: { username: authCredentialDto.username },
    });
    if (!user) {
      throw new ConflictException('User Not Found');
    }
    const token = await this.getToken(user.id, user.username);
    return token;
  }
}
