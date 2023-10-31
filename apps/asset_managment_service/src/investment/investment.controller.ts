import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { CreateInvestmentRequest } from './dto/request/createInvestmentRequest.dto';
import { CreateInvestmentCommand } from './commands/createInvestment.command';
import { FailedTransactionCreationCommand } from './commands/failedTransactionCreation.command';
import { FailedTransactionCreationDto } from './dto/request/failedTransactionCreation.dto';
import { SuccessTransactionCreationCommand } from './commands/successTransactionCreation.command';
import { SuccessTransactionCreationDto } from './dto/request/successTransactionCreation.dto';

@Controller()
export class InvestmentController {

    constructor(private readonly commandBus: CommandBus){}

    @MessagePattern("investment.creation")
    async createInvestment(@Payload() data: CreateInvestmentRequest, @Ctx() context: RmqContext) {
        await this.commandBus.execute<CreateInvestmentCommand,void>(new CreateInvestmentCommand(data))
    }

    @MessagePattern("fail.transaction.creation")
    async processFailedTransactionCreation(@Payload() data: FailedTransactionCreationDto, @Ctx() context: RmqContext) {
        await this.commandBus.execute<FailedTransactionCreationCommand,void>(new FailedTransactionCreationCommand(data));
    }

    @MessagePattern("success.transaction.creation")
    async processSuccessTransactionCreation(@Payload() data: SuccessTransactionCreationDto, @Ctx() context: RmqContext) {
        await this.commandBus.execute<SuccessTransactionCreationCommand,void>(new SuccessTransactionCreationCommand(data));
    }
}
