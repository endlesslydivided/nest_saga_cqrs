import { EntitySchemaFactory } from "@app/libs/database";

import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { Investment } from "./investment.schema";
import { InvestmentDomainModel } from "../domain/Investment.model";

@Injectable()
export class InvestmentSchemaFactory implements EntitySchemaFactory<Investment,InvestmentDomainModel>{

    create(entity: InvestmentDomainModel): Investment{
        return{
            _id: new ObjectId(entity.getId()),
            name: entity.getName(),
            description:entity.getDescription(),
            startDate: entity.getStartDate(),
            endDate: entity.getEndDate(),
            initialAmount: entity.getInitialAmount(),
            currentValue:entity.getCurrentValue()
        }
    }

    createFromSchema(entitySchema: Investment): InvestmentDomainModel {
        return new InvestmentDomainModel(
            entitySchema._id.toHexString(),
            entitySchema.name,
            entitySchema.description,
            entitySchema.startDate,
            entitySchema.endDate,
            entitySchema.initialAmount,
            entitySchema.currentValue
        )
    }
}