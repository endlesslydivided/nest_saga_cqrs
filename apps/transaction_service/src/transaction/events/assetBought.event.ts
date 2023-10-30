import { TransactionDomainModel } from "../domain/Transaction.model";

export class AssetBoughtEvent{
    constructor(public readonly transaction:TransactionDomainModel){}
}