import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateInvestmentCommand } from "./createInvestment.command";
import { InvestmentFactory } from "../domain/Investment.factory";
import { SuccessTransactionCreationCommand } from "./successTransactionCreation.command";
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RMQ_INVESTMENT_SERVICE_NAME } from "../transaction.consts";

@CommandHandler(SuccessTransactionCreationCommand)
export class SuccessTransactionCreationHandler implements ICommandHandler<SuccessTransactionCreationCommand> {

    constructor(
      @Inject(RMQ_INVESTMENT_SERVICE_NAME) private investmentClient: ClientProxy
  ) {
      this.investmentClient.connect();
  }
  async execute({data}: SuccessTransactionCreationCommand) {
    this.investmentClient.send("success.investment.creation",JSON.stringify(data))
  }
}