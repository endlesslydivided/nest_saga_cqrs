import { AggregateRoot } from "@nestjs/cqrs";

export class InvestmentDomainModel extends AggregateRoot{


    constructor(
        private readonly _id:string,
        private readonly name:string,
        private readonly description:string,
        private readonly startDate:Date,
        private readonly endDate:Date,
        private readonly initialAmount:number,
        private readonly currentValue:number,
    ){
        super()
    }

    getId(){
        return this._id;
    }

    getName(){
        return this.name;
    }

    getDescription(){
        return this.description;
    }

    getStartDate(){
        return this.startDate;
    }

    getEndDate(){
        return this.endDate;
    }

    getInitialAmount(){
        return this.initialAmount;
    }

    getCurrentValue(){
        return this.currentValue;
    }
    
    

}