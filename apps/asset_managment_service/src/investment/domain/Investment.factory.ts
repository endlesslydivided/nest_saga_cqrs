import { Injectable } from "@nestjs/common";
import {ObjectId} from 'mongodb'
import { InvestmentDomainModel } from "./Investment.model";
import { InvestmentEntityRepository } from "../db/investment-entity.repository";
import { InvestmentCreatedEvent } from "../events/investmentCreated.event";
import { EntityFactory } from "@app/libs/database";


@Injectable()
export class InvestmentFactory implements EntityFactory<InvestmentDomainModel>{

    constructor(private repository: InvestmentEntityRepository){}

    async create(  
        name:string,
        description:string,
        startDate:string,
        endDate:string,
        initialAmount:number,
        currentValue:number): Promise<InvestmentDomainModel> {

        const investment = new InvestmentDomainModel(
            new ObjectId().toHexString(),
            name,
            description,
            new Date(startDate),
            new Date(endDate),
            initialAmount,
            currentValue,
        );
        await this.repository.create(investment);
        investment.apply(
            new InvestmentCreatedEvent(investment)
        );
        return investment;
    }

    async remove(investmentId:string): Promise<void> {
        await this.repository.remove(investmentId);
    }
}