import { AggregateRoot } from "@nestjs/cqrs";

export class TransactionDomainModel extends AggregateRoot{

    constructor(
        private readonly _id:string,
        private readonly investmentId:string,
        private readonly transactionDate:Date,
        private readonly amount:number,
        private readonly units:string,
    ){
        super()
    }

    getId(){
        return this._id;
    }

    getInvestmentId(){
        return this.investmentId;
    }

    getTransactionDate(){
        return this.transactionDate;
    }

    getAmount(){
        return this.amount;
    }

    getUnits(){
        return this.units;
    }

}