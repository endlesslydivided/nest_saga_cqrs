import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InvestmentCreatedEvent } from "./investmentCreated.event";
import { Inject } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { RMQ_TRANSACTION_SERVICE_NAME } from "../transaction.consts";

@EventsHandler(InvestmentCreatedEvent)
export class InvestmentCreatedHandler implements IEventHandler<InvestmentCreatedEvent>{

    
    constructor(
        @Inject(RMQ_TRANSACTION_SERVICE_NAME) private client: ClientProxy
    ) {
        this.client.connect();
    }

    async handle(event: InvestmentCreatedEvent) {
        console.log(`Investment ${event.dto.investmentId} was created.`);
        this.client.send('investment.created',event.dto).subscribe();
    }
}