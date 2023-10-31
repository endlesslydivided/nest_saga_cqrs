import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter  implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);
  }
}
