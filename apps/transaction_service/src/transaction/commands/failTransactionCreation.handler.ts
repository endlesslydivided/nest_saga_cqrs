import { Inject } from "@nestjs/common";
import { CommandHandler, IEventHandler } from "@nestjs/cqrs";
import { ClientProxy } from "@nestjs/microservices";
import { FailTransactionCreationCommand } from "./failTransactionCreation.command";
import { RMQ_INVESTMENT_SERVICE_NAME } from "../transaction.consts";

@CommandHandler(FailTransactionCreationCommand)
export class FailTransactionCreationHandler implements IEventHandler<FailTransactionCreationCommand>{
    constructor(
        @Inject(RMQ_INVESTMENT_SERVICE_NAME) private investmentClient: ClientProxy
    ) {
        this.investmentClient.connect();
    }
    
    async handle({exception}: FailTransactionCreationCommand) {
        this.investmentClient.send("fail.transaction.creation",JSON.stringify(exception))
    }
}