import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { BuyAssetCommand } from './commands/buyAsset.command';
import { BuyAsssetRequest } from './dto/request/buyAssetRequest.dto';
import { FailTransactionCreationCommand } from './commands/failTransactionCreation.command';

@Controller()
export class TransactionController {

    constructor(private readonly commandBus: CommandBus){}

    @MessagePattern("investment.created")
    async createTransaction(@Payload() data: BuyAsssetRequest, @Ctx() context: RmqContext) {
        try
        {
            await this.commandBus.execute<BuyAssetCommand,void>(new BuyAssetCommand(data))
        }
        catch(e)
        {
            await this.commandBus.execute<FailTransactionCreationCommand,void>(new FailTransactionCreationCommand(e))
        }
    }
}

/*
Message example:
{  
    "pattern": "investment.created",
    "data":
     {
      "investment_id":"123",
      "transaction_date":"2023-05-16",
      "amount":"123",
      "units":"oil"
     }
}
*/