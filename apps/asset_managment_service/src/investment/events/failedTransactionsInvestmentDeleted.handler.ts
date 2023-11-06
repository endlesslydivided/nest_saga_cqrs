import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { FailedTransactionsInvestmentDeletedEvent } from "./failedTransactionsInvestmentDeleted.event";
import { RMQ_INVESTMENT_SERVICE_NAME } from "../transaction.consts";

@EventsHandler(FailedTransactionsInvestmentDeletedEvent)
export class FailedTransactionsInvestmentDeletedHandler implements IEventHandler<FailedTransactionsInvestmentDeletedEvent>{

    constructor(
        @Inject(RMQ_INVESTMENT_SERVICE_NAME) private client: ClientProxy
    ) {
        this.client.connect();
    }
    async handle({exception,investmentId}: FailedTransactionsInvestmentDeletedEvent) {
        console.log(`Investment wasn't created. Reason:${JSON.stringify(exception)}`)
        this.client.send("fail.investment.creation",{
            exception,
            investmentId
        })
    }
}