import { EntitySchemaFactory } from "@app/libs/database";
import { TransactionDomainModel } from "../domain/Transaction.model";
import { Transaction } from "./transaction.schema";
import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";

@Injectable()
export class TransactionSchemaFactory implements EntitySchemaFactory<Transaction,TransactionDomainModel>{

    create(entity: TransactionDomainModel): Transaction{
        return{
            _id: new ObjectId(entity.getId()),
            investment_id:entity.getInvestmentId(),
            transaction_date:entity.getTransactionDate(),
            amount:entity.getAmount(),
            units:entity.getUnits(),
        }
    }

    createFromSchema(entitySchema: Transaction): TransactionDomainModel {
        return new TransactionDomainModel(
            entitySchema._id.toHexString(),
            entitySchema.investment_id,
            entitySchema.transaction_date,
            entitySchema.amount,
            entitySchema.units
        )
    }
}