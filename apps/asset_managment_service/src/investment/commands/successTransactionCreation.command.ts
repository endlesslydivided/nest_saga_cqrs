import { SuccessTransactionCreationDto } from "../dto/request/successTransactionCreation.dto";

export class SuccessTransactionCreationCommand {
    constructor(
      public readonly data: SuccessTransactionCreationDto,

    ) {}
  }