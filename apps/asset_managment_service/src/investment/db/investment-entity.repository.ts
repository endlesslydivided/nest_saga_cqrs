import { Injectable } from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InvestmentDomainModel } from "../domain/Investment.model";
import { InvestmentSchemaFactory } from "./investment-schema.factory";
import { Investment } from "./investment.schema";
import { BaseEntityRepository } from "@app/libs/database";


@Injectable()
export class InvestmentEntityRepository extends BaseEntityRepository<Investment,InvestmentDomainModel>{

    constructor(
        @InjectModel(Investment.name)
        investmentModel:Model<Investment>,
        investmentSchemaFactory:InvestmentSchemaFactory
    ){
        super(investmentModel,investmentSchemaFactory)
    }
}