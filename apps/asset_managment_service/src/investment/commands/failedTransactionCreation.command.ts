import { FailedTransactionCreationDto } from "../dto/request/failedTransactionCreation.dto";

export class FailedTransactionCreationCommand {
    constructor(
      public readonly data: FailedTransactionCreationDto,

    ) {}
  }