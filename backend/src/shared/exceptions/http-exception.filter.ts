import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

// Centralized error handling for validation, Mongoose, and generic errors
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // If it's already an HttpException, forward as-is with normalized body
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();
      const normalized = this.normalizeHttpExceptionBody(res);
      return response.status(status).json(normalized);
    }

    // Handle common Mongoose errors
    const mongooseHandled = this.tryHandleMongooseError(exception);
    if (mongooseHandled) {
      const { status, body } = mongooseHandled;
      return response.status(status).json(body);
    }

    // Fallback: Internal Server Error
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception instanceof Error ? exception.message : 'Internal server error';
    return response.status(status).json({
      statusCode: status,
      error: 'Internal Server Error',
      message,
    });
  }

  private normalizeHttpExceptionBody(res: unknown) {
    if (typeof res === 'string') {
      return { statusCode: 400, error: 'Bad Request', message: res };
    }
    if (typeof res === 'object' && res) {
      // Ensure consistent shape
      const anyRes = res as Record<string, unknown>;
      return {
        statusCode: anyRes['statusCode'] ?? 400,
        error: typeof anyRes['error'] === 'string' ? anyRes['error'] : 'Bad Request',
        message: anyRes['message'] ?? 'Bad Request',
        // include optional details if present
        details: anyRes['details'],
      };
    }
    return { statusCode: 400, error: 'Bad Request', message: 'Bad Request' };
  }

  private tryHandleMongooseError(exception: unknown):
    | { status: number; body: { statusCode: number; error: string; message: string } }
    | null {
    const err = exception as { name?: string; code?: number; message?: string };
    // Duplicate key error
    if (err && (err as any).code === 11000) {
      return {
        status: HttpStatus.CONFLICT,
        body: {
          statusCode: HttpStatus.CONFLICT,
          error: 'Conflict',
          message: 'Resource already exists',
        },
      };
    }
    // CastError, ValidationError (from Mongoose)
    if (err?.name === 'CastError' || err?.name === 'ValidationError') {
      return {
        status: HttpStatus.BAD_REQUEST,
        body: {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: err.message || 'Invalid data',
        },
      };
    }
    return null;
  }
}


