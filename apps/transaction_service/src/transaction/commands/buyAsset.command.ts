import { BuyAsssetRequest } from "../dto/request/buyAssetRequest.dto";

export class BuyAssetCommand {
    constructor(
      public readonly buyAssetRequest: BuyAsssetRequest,
    ) {}
  }