import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { FailedTransactionCreationEvent } from "./failedTransactionCreation.event";
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RMQ_INVESTMENT_SERVICE_NAME } from "../transaction.consts";

@EventsHandler(FailedTransactionCreationEvent)
export class FailedTransactionCreationEventHandler implements IEventHandler<FailedTransactionCreationEvent>{
    constructor(
        @Inject(RMQ_INVESTMENT_SERVICE_NAME) private investmentClient: ClientProxy
    ) {
        this.investmentClient.connect();
    }
    
    async handle(event: FailedTransactionCreationEvent) {
        console.log("Fail transaction",event.investmentId);
        this.investmentClient.send("fail.transaction.creation",event).subscribe();
    }
}