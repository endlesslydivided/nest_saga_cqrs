import { BuyAssetHander } from "./buyAsset.handler";
import { FailTransactionCreationHandler } from "./failTransactionCreation.handler";
import { SuccessTransactionCreationHandler } from "./successTransactionCreation.handler";

export const TransactionCommandHandlers = [BuyAssetHander, SuccessTransactionCreationHandler,FailTransactionCreationHandler]