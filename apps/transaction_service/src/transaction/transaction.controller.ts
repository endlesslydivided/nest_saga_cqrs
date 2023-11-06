import { Controller } from '@nestjs/common';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { BuyAssetCommand } from './commands/buyAsset.command';
import { BuyAsssetRequest } from './dto/request/buyAssetRequest.dto';
import { FailedTransactionCreationEvent } from './events/failedTransactionCreation.event';

@Controller()
export class TransactionController {

    constructor(private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus
        ){}

    @MessagePattern("investment.created")
    async createTransaction(@Payload() data: BuyAsssetRequest, @Ctx() context: RmqContext) {
        try
        {
            await this.commandBus.execute<BuyAssetCommand,void>(new BuyAssetCommand(data))
        }
        catch(e)
        {
            this.eventBus.publish(new FailedTransactionCreationEvent(e,data.investmentId))
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