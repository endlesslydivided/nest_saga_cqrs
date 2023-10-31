/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { InvestmentModule } from './investment/investment.module';
import { AllExceptionsFilter } from './filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(InvestmentModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'investment_queue',
      queueOptions: {
        durable: false,
        json:true
      },
    },
  });
  app.useGlobalFilters(new AllExceptionsFilter())
  await app.listen();
}

bootstrap();
