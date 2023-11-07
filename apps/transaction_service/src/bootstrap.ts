import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TransactionModule } from './transaction/transaction.module';
import { AllExceptionsFilter } from '../filters/exception.filter';


export async function bootstrap() {
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(TransactionModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'transaction',
      queueOptions: {
        durable: true,
        json:true
      },
    },
  });

  app.useGlobalFilters(new AllExceptionsFilter())
  await app.listen();
}
