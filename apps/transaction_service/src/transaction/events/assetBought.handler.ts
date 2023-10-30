import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AssetBoughtEvent } from "./assetBought.event";

@EventsHandler(AssetBoughtEvent)
export class AssetBoughtHandler implements IEventHandler<AssetBoughtEvent>{
    async handle({transaction}: AssetBoughtEvent) {
        console.log(`Transaction ${transaction.getId()} was created.`)
    }
}