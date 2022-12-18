import {
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LocalGuards } from '../guards/local.guard';
import { AuthCredentialDto } from '../dto/auth.dto';
import { Response } from 'express';
import { HeaderInterceptor } from '../interceptor/response.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuards)
  @UseInterceptors(new HeaderInterceptor())
  @Post('/login')
  async loginUser(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string }> {
    const token = await this.authService.loginUser(
      req.user as AuthCredentialDto,
    );
    response.status(200).cookie('refreshToken', token.refresh_token, {
      maxAge: 1000 * 60 * 20,
      secure: true,
      httpOnly: true,
    });
    return { accessToken: token.access_token };
  }

  @UseInterceptors(new HeaderInterceptor())
  @Get('/refreshToken')
  async refresh(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string }> {
    const Token = await this.authService.validateRefreshToken(
      req.cookies.refreshToken,
    );
    response.status(200).cookie('refreshToken', req.cookies.refreshToken, {
      maxAge: 1000 * 60 * 20,
      secure: true,
      httpOnly: true,
    });
    return { accessToken: Token.accessToken };
  }
}
