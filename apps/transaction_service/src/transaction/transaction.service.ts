import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BuyAsssetRequest } from './dto/request/buyAssetRequest.dto';
import { BuyAssetCommand } from './commands/buyAsset.command';

@Injectable()
export class TransactionService {

  constructor(private commandBus: CommandBus) {}

  async buyAsset(buyAssetRequest: BuyAsssetRequest) {
    return this.commandBus.execute(
      new BuyAssetCommand(buyAssetRequest)
    );
  }
}
