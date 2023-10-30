import { Injectable } from "@nestjs/common";
import { TransactionDomainModel } from "./Transaction.model";
import { EntityFactory } from "@app/libs/database";
import {ObjectId} from 'mongodb'
import { AssetBoughtEvent } from "../events/assetBought.event";
import { TransactionEntityRepository } from "../db/transaction-entity.repository";

@Injectable()
export class TransactionFactory implements EntityFactory<TransactionDomainModel>{

    constructor(private repository: TransactionEntityRepository){}

    async create(  
        investment_id:string,
        transaction_date:string,
        amount:number,
        units:string): Promise<TransactionDomainModel> {
        const transaction = new TransactionDomainModel(
            new ObjectId().toHexString(),
            investment_id,
            new Date(transaction_date),
            amount,
            units
        );
        await this.repository.create(transaction);
        transaction.apply(
            new AssetBoughtEvent(transaction)
        );
        return transaction;
    }
}