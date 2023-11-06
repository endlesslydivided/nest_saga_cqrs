import { CreateInvestmentHandler } from "./createInvestment.handler";
import { FailedTransactionCreationHandler } from "./failedTransactionCreation.handler";

export const InvestmentCommandHandlers = [CreateInvestmentHandler,FailedTransactionCreationHandler]