import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import Joi from '@hapi/joi';
import HttpResponse from '../libs/http-response';

@Injectable()
export default class Vp implements PipeTransform<any> {
  constructor(private readonly schema: Joi.ObjectSchema) {}

  public transform(value: any) {
    const { error } = this.schema.validate(value, { abortEarly: false });
    if (error) {
      const { details } = error;
      let errorMessage: string = details[0].message;
      errorMessage = errorMessage.replace(/"/g, '');
      throw new BadRequestException(HttpResponse.error(errorMessage));
    }
    return value;
  }

  static for<T extends Joi.ObjectSchema>(schema: T): Vp {
    return new Vp(schema);
  }
}
