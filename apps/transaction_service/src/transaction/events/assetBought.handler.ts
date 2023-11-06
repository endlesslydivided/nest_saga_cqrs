import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AssetBoughtEvent } from "./assetBought.event";
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { SuccessTransactionCreationCommand } from "../commands/successTransactionCreation.command";
import { RMQ_INVESTMENT_SERVICE_NAME } from "../transaction.consts";

@EventsHandler(AssetBoughtEvent)
export class AssetBoughtHandler implements IEventHandler<AssetBoughtEvent>{
    constructor(
        @Inject(RMQ_INVESTMENT_SERVICE_NAME) private investmentClient: ClientProxy
    ) {
        this.investmentClient.connect();
    }
    
    async handle({transaction}: AssetBoughtEvent) {
        this.investmentClient.send("success.transaction.creation",transaction).subscribe();
    }
}