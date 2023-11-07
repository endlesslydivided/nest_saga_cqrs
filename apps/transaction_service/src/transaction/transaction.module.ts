import { DatabaseModule } from '@app/libs/database';
import { RmqModule } from '@app/libs/rmq';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionCommandHandlers } from './commands';
import { TransactionEntityRepository } from './db/transaction-entity.repository';
import { TransactionSchemaFactory } from './db/transaction-schema.factory';
import { Transaction, TransactionSchema } from './db/transaction.schema';
import { TransactionFactory } from './domain/Transaction.factory';
import { TransactionEventHandlers } from './events';
import { TransactionController } from './transaction.controller';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { RMQ_INVESTMENT_SERVICE_NAME } from './transaction.consts';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/transaction_service/.env',
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_TRANSACTION_QUEUE: Joi.string().required(),
      }),
    }),
    CqrsModule,
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    DatabaseModule, 
    RmqModule.register({
      name: RMQ_INVESTMENT_SERVICE_NAME,
    }),
  ],
  providers: [
    TransactionEntityRepository,
    TransactionSchemaFactory,
    TransactionFactory,
    ...TransactionCommandHandlers,
    ...TransactionEventHandlers
  ],
  controllers: [TransactionController]
})
export class TransactionModule {}
