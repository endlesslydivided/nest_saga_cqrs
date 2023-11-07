import { FailedTransactionsInvestmentDeletedHandler } from "./failedTransactionsInvestmentDeleted.handler";
import { InvestmentCreatedHandler } from "./investmentCreated.handler";


export const InvestmentEventHandlers = [InvestmentCreatedHandler,FailedTransactionsInvestmentDeletedHandler]