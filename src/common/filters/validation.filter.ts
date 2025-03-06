import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch(HttpException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (status === 400) {
      const exceptionResponse = exception.getResponse() as any;
      const validationErrors = exceptionResponse.message as ValidationError[];

      const message = validationErrors.reduce((prev, curr) => {
        prev[curr.property] = Object.entries(curr.constraints as any).map(
          ([k, v]) => {
            return k;
          },
        );

        return prev;
      }, {});

      response.status(status).json({
        error: exceptionResponse.error,
        message: message,
        statusCode: status,
      });
    } else {
      response.status(status).json(exception.getResponse());
    }
  }
}
