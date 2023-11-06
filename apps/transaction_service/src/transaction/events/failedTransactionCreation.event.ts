import { TransactionDomainModel } from "../domain/Transaction.model";

export class FailedTransactionCreationEvent{
    constructor(public readonly exception:unknown,
        public readonly investmentId:string){}
}