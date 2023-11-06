import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateInvestmentCommand } from "./createInvestment.command";
import { InvestmentFactory } from "../domain/Investment.factory";
import { InvestmentCreatedEvent } from "../events/investmentCreated.event";

@CommandHandler(CreateInvestmentCommand)
export class CreateInvestmentHandler implements ICommandHandler<CreateInvestmentCommand> {
  constructor(
    private readonly investmentFactory: InvestmentFactory,
    private readonly eventPublisher: EventPublisher
    ) {}

  async execute({createInvestmentRequest}: CreateInvestmentCommand) {
    const { name,description,startDate,endDate,initialAmount,currentValue,units,amount } = createInvestmentRequest;
    const investment = this.eventPublisher.mergeObjectContext(await this.investmentFactory.create(
        name,
        description,
        startDate,
        endDate,
        initialAmount,
        currentValue
      )
    );
    investment.apply(
      new InvestmentCreatedEvent({
        investmentId: investment.getId(),
        amount,
        units,
        transactionDate:startDate
      })
  );
    investment.commit();    
  }
}