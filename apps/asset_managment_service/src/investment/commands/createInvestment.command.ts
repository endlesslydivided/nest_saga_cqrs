import { CreateInvestmentRequest } from "../dto/request/createInvestmentRequest.dto";

export class CreateInvestmentCommand {
    constructor(
      public readonly createInvestmentRequest: CreateInvestmentRequest,
    ) {}
  }