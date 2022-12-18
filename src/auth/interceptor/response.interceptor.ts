/* eslint-disable prettier/prettier */
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';

export class HeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const response: Response = context.switchToHttp().getResponse();
    response
      .header('Access-Control-Allow-Credentials', 'true')
      .header('Access-Control-Allow-Origin', 'http://localhost:3001')
      .header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
      .header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept,Authorization',
      );
    return next.handle();
  }
}
