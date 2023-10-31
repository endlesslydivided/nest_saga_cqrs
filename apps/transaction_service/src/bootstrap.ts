import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TransactionModule } from './transaction/transaction.module';

export async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(TransactionModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'transaction_queue',
      queueOptions: {
        durable: false,
        json:true
      },
    },
  });
  await app.listen();

}
