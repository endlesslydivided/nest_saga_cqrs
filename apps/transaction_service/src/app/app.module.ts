import { DatabaseModule } from '@app/libs/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from '../transaction/db/transaction.schema';
import {RmqModule} from '@app/libs/rmq'
import Joi from 'joi';
import { TransactionModule } from '../transaction/transaction.module';


@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/transaction_service/.env',
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_TRANSACTION_QUEUE: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    TransactionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
