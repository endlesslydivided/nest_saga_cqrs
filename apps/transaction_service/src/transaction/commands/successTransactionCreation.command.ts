import { TransactionDomainModel } from "../domain/Transaction.model";

export class SuccessTransactionCreationCommand{
    constructor(public readonly transaction:TransactionDomainModel){}
}