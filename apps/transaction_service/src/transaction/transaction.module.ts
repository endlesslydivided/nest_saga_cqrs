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
import { TransactionService } from './transaction.service';


export const RMQ_SERVICE_NAME = "TRANSACTION"

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    DatabaseModule, 
    RmqModule.register({
      name: RMQ_SERVICE_NAME,
    }),
  ],
  providers: [
    TransactionService,
    TransactionEntityRepository,
    TransactionSchemaFactory,
    TransactionFactory,
    ...TransactionCommandHandlers,
    ...TransactionEventHandlers
  ],
  controllers: [TransactionController]
})
export class TransactionModule {}
