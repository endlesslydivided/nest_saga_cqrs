import { InvestmentDomainModel } from "../domain/Investment.model";
import { BuyAsssetResponse } from "../dto/response/buyAssetResponse.dto";

export class InvestmentCreatedEvent{
    constructor(public readonly dto:BuyAsssetResponse){}
}