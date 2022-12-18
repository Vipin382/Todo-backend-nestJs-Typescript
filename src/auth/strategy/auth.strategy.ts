/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log(ExtractJwt.fromAuthHeaderAsBearerToken());
    super({
      secretOrKey: 'todolist',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return {
      username: payload.username,
      id: payload.id,
    };
  }
}
