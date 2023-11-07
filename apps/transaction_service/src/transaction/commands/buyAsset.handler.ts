import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { BuyAssetCommand } from "./buyAsset.command";
import { TransactionFactory } from "../domain/Transaction.factory";

@CommandHandler(BuyAssetCommand)
export class BuyAssetHander implements ICommandHandler<BuyAssetCommand> {
  constructor(
    private readonly transactionFactory: TransactionFactory,
    private readonly eventPublisher: EventPublisher
    ) {}

  async execute({buyAssetRequest}: BuyAssetCommand) {
    const { investmentId,transactionDate,amount,units } = buyAssetRequest;
    const transaction = this.eventPublisher.mergeObjectContext(await this.transactionFactory.create(
        investmentId,
        transactionDate,
        amount,
        units)
    );
    transaction.commit();    
  }
}