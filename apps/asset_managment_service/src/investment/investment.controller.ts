import { Controller, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { CreateInvestmentRequest } from './dto/request/createInvestmentRequest.dto';
import { CreateInvestmentCommand } from './commands/createInvestment.command';
import { FailedTransactionCreationCommand } from './commands/failedTransactionCreation.command';
import { FailedTransactionCreationDto } from './dto/request/failedTransactionCreation.dto';
import { SuccessTransactionCreationDto } from './dto/request/successTransactionCreation.dto';

@Controller()
export class InvestmentController {

    private readonly logger = new Logger(InvestmentController.name);

    constructor(private readonly commandBus: CommandBus){}

    @MessagePattern("investment.creation")
    async createInvestment(@Payload() data: CreateInvestmentRequest, @Ctx() context: RmqContext) {
        this.logger.debug(`Message (investment.creation): ${JSON.stringify(data)}`);
        await this.commandBus.execute<CreateInvestmentCommand,void>(new CreateInvestmentCommand(data))
    }

    @MessagePattern("fail.investment.creation")
    async failInvestment(@Payload() data: any, @Ctx() context: RmqContext) {
        this.logger.error(`Message(fail.investment.creation): ${JSON.stringify(data)}`);
    }

    @MessagePattern("fail.transaction.creation")
    async processFailedTransactionCreation(@Payload() data: FailedTransactionCreationDto, @Ctx() context: RmqContext) {
        this.logger.debug(`Message (fail.transaction.creation): ${JSON.stringify(data)}`);
        await this.commandBus.execute<FailedTransactionCreationCommand,void>(new FailedTransactionCreationCommand(data));
    }

    @MessagePattern("success.transaction.creation")
    async processSuccessTransactionCreation(@Payload() data: SuccessTransactionCreationDto, @Ctx() context: RmqContext) {
        this.logger.debug(`Message (success.transaction.creation): ${JSON.stringify(data,null,2)}`);
    }
}


/*
Message example:
{  
    "pattern": "investment.creation",
    "data":
     {
        "name": "Heyo!",
        "description": "Bla bla bla",
        "startDate":"2023-05-12",
        "endDate":"2023-05-18",
        "initialAmount":123,
        "currentValue":123,
        "amount":"123",
        "units":"oil"
     }
}
*/