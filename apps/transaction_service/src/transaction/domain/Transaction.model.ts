import { AggregateRoot } from "@nestjs/cqrs";

export class TransactionDomainModel extends AggregateRoot{

    constructor(
        private readonly _id:string,
        private readonly investment_id:string,
        private readonly transaction_date:Date,
        private readonly amount:number,
        private readonly units:string,
    ){
        super()
    }

    getId(){
        return this._id;
    }

    getInvestmentId(){
        return this.investment_id;
    }

    getTransactionDate(){
        return this.transaction_date;
    }

    getAmount(){
        return this.amount;
    }

    getUnits(){
        return this.units;
    }

}