import { HttpException } from '@nestjs/common';
import { ErrorMessages } from './error-messages';

export default class HttpResponse<T> {
  httpCode: number;
  message: string;
  data: T;
  success: boolean;
  errorCode?: number;

  private constructor(
    success: boolean,
    data: T,
    message: string,
    httpCode: number,
    errorCode = 0,
  ) {
    this.success = success;
    this.data = data;
    this.message = String(message);
    this.httpCode = httpCode;
    this.errorCode = errorCode;
  }

  // Commonly used status codes
  static success<T>(data: T, message = '', httpCode = 200): HttpResponse<T> {
    return new HttpResponse<T>(true, data, message, httpCode);
  }

  static created<T>(
    data: T,
    message = 'Entry Created',
    httpCode = 201,
  ): HttpResponse<T> {
    return new HttpResponse<T>(true, data, message, httpCode);
  }

  static error<T>(
    message: string,
    obj?: { errorCode?: number; httpCode?: number; data?: any },
  ): HttpResponse<T> {
    const { errorCode = 0, httpCode = 400, data = null } = obj || {};
    return new HttpResponse<T>(false, data, message, httpCode, errorCode);
  }

  static unauthorized<T>(message = 'Unauthorized'): HttpResponse<T> {
    return new HttpResponse<T>(false, null as any, message, 401);
  }

  static forbidden<T>(message = 'Forbidden Access'): HttpResponse<T> {
    return new HttpResponse<T>(false, null as any, message, 403);
  }

  static notFound<T>(message = 'Not found'): HttpResponse<T> {
    return new HttpResponse<T>(false, null as any, message, 404);
  }

  static serverError<T>(message = 'Internal server error'): HttpResponse<T> {
    return new HttpResponse<T>(false, null as any, message, 500);
  }

  // Additional status codes
  static badRequest<T>(message = 'Bad Request'): HttpResponse<T> {
    return new HttpResponse<T>(false, null as any, message, 400);
  }

  static methodNotAllowed<T>(message = 'Method Not Allowed'): HttpResponse<T> {
    return new HttpResponse<T>(false, null as any, message, 405);
  }

  static conflict<T>(message = 'Conflict'): HttpResponse<T> {
    return new HttpResponse<T>(false, null as any, message, 409);
  }

  static preconditionFailed<T>(
    message = 'Precondition Failed',
  ): HttpResponse<T> {
    return new HttpResponse<T>(false, null as any, message, 412);
  }

  static tooManyRequests<T>(message = 'Too Many Requests'): HttpResponse<T> {
    return new HttpResponse<T>(false, null as any, message, 429);
  }

  static unprocessableEntity<T>(
    message = 'Unprocessable Entity',
  ): HttpResponse<T> {
    return new HttpResponse<T>(false, null as any, message, 422);
  }

  static unsupportedMediaType<T>(
    message = 'Unsupported Media Type',
  ): HttpResponse<T> {
    return new HttpResponse<T>(false, null as any, message, 415);
  }
}

export type PromisedHTTPResp<T> = Promise<HttpResponse<T>>;

export const handleHTTPResponse = async (
  resp: HttpResponse<any> | PromisedHTTPResp<any>,
) => {
  const r: HttpResponse<any> = await resp;

  if (r.success) return resp;

  if (r.message) {
    // Check if the status code corresponds to a predefined error message
    if (ErrorMessages?.[r.httpCode]) {
      r.message = r.message || ErrorMessages[r.httpCode];
      r.errorCode = r.httpCode;
    }
  }

  throw new HttpException(
    { message: r.message, errorCode: r.errorCode },
    r.httpCode,
  );
};
