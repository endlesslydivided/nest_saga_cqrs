import { Inject } from "@nestjs/common";
import { CommandHandler, IEventHandler } from "@nestjs/cqrs";
import { ClientProxy } from "@nestjs/microservices";
import { SuccessTransactionCreationCommand } from "./successTransactionCreation.command";
import { RMQ_SERVICE_NAME } from "../transaction.module";

@CommandHandler(SuccessTransactionCreationCommand)
export class SuccessTransactionCreationHandler implements IEventHandler<SuccessTransactionCreationCommand>{
    constructor(
        @Inject(RMQ_SERVICE_NAME) private readonly client: ClientProxy
    ) {
        this.client.connect();
    }
    
    async handle({transaction}: SuccessTransactionCreationCommand) {
        this.client.send("success.transaction.creation",JSON.stringify(transaction))
    }
}