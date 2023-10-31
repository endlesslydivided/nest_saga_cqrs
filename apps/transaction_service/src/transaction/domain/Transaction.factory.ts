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
        investmentId:string,
        transactionDate:string,
        amount:number,
        units:string): Promise<TransactionDomainModel> {

        const transaction = new TransactionDomainModel(
            new ObjectId().toHexString(),
            investmentId,
            new Date(transactionDate),
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