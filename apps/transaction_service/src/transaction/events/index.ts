import { AssetBoughtHandler } from "./assetBought.handler";
import { FailedTransactionCreationEventHandler } from "./failedTransactionCreation.handler";


export const TransactionEventHandlers = [AssetBoughtHandler,FailedTransactionCreationEventHandler]