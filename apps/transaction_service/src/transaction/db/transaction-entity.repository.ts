import { Injectable } from "@nestjs/common";
import { BaseEntityRepository } from "@app/libs/database";
import { Transaction} from "./transaction.schema";
import { TransactionDomainModel } from "../domain/Transaction.model";
import { InjectModel } from "@nestjs/mongoose";
import { TransactionSchemaFactory } from "./transaction-schema.factory";
import { Model } from "mongoose";


@Injectable()
export class TransactionEntityRepository extends BaseEntityRepository<Transaction,TransactionDomainModel>{

    constructor(
        @InjectModel(Transaction.name)
        transactionModel:Model<Transaction>,
        transactionSchemaFactory:TransactionSchemaFactory
    ){
        super(transactionModel,transactionSchemaFactory)
    }
}