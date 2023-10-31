import { Inject } from "@nestjs/common";
import { CommandHandler, IEventHandler } from "@nestjs/cqrs";
import { ClientProxy } from "@nestjs/microservices";
import { SuccessTransactionCreationCommand } from "./successTransactionCreation.command";
import { RMQ_INVESTMENT_SERVICE_NAME } from "../transaction.consts";

@CommandHandler(SuccessTransactionCreationCommand)
export class SuccessTransactionCreationHandler implements IEventHandler<SuccessTransactionCreationCommand>{
    constructor(
        @Inject(RMQ_INVESTMENT_SERVICE_NAME) private investmentClient: ClientProxy
    ) {
        this.investmentClient.connect();
    }
    
    async handle({transaction}: SuccessTransactionCreationCommand) {
        this.investmentClient.send("success.transaction.creation",JSON.stringify(transaction))
    }
}