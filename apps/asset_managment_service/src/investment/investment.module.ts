import { Module } from '@nestjs/common';
import { InvestmentController } from './investment.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Investment, InvestmentSchema } from './db/investment.schema';
import { DatabaseModule } from '@app/libs/database';
import { RmqModule } from '@app/libs/rmq';
import { InvestmentSchemaFactory } from './db/investment-schema.factory';
import { InvestmentEntityRepository } from './db/investment-entity.repository';
import { InvestmentCommandHandlers } from './commands';
import { InvestmentFactory } from './domain/Investment.factory';
import { InvestmentEventHandlers } from './events';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_INVESTMENT_SERVICE_NAME, RMQ_TRANSACTION_SERVICE_NAME } from './transaction.consts';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';


@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/asset_managment_service/.env',
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_INVESTMENT_QUEUE: Joi.string().required(),
      }),
    }),
    CqrsModule,
    MongooseModule.forFeature([{ name: Investment.name, schema: InvestmentSchema }]),
    DatabaseModule, 
    RmqModule.register({
      name:RMQ_INVESTMENT_SERVICE_NAME
    }),
    RmqModule.register({
      name:RMQ_TRANSACTION_SERVICE_NAME
    }),   
  ],
  providers:[
    InvestmentEntityRepository,
    InvestmentSchemaFactory,
    InvestmentFactory,
    ...InvestmentCommandHandlers,
    ...InvestmentEventHandlers
  ],
  controllers: [InvestmentController]
})
export class InvestmentModule {}
