import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateInvestmentCommand } from "./createInvestment.command";
import { InvestmentFactory } from "../domain/Investment.factory";
import { FailedTransactionCreationCommand } from "./failedTransactionCreation.command";
import { FailedTransactionsInvestmentDeletedEvent } from "../events/failedTransactionsInvestmentDeleted.event";

@CommandHandler(FailedTransactionCreationCommand)
export class FailedTransactionCreationHandler implements ICommandHandler<FailedTransactionCreationCommand> {
  constructor(
    private readonly investmentFactory: InvestmentFactory,
    private readonly eventBus: EventBus
    ) {}

  async execute({data}: FailedTransactionCreationCommand) {
    const {exception,investmentId} = data;
    await this.investmentFactory.remove(investmentId);
    this.eventBus.publish(new FailedTransactionsInvestmentDeletedEvent(exception,investmentId))
  }
}