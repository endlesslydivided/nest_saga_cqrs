import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IdentifiableEntitySchema } from "@app/libs/database";

@Schema({versionKey: false, collection: 'transactions'})
export class Transaction extends IdentifiableEntitySchema{

    @Prop()
    investmentId: string

    @Prop()
    transactionDate: Date

    @Prop()
    amount:number

    @Prop()
    units:string
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);