import { InvestmentDomainModel } from "../domain/Investment.model";

export class InvestmentCreatedEvent{
    constructor(public readonly investmentId:InvestmentDomainModel){}
}