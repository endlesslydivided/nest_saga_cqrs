import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IdentifiableEntitySchema } from "@app/libs/database";

@Schema({versionKey: false, collection: 'transactions'})
export class Transaction extends IdentifiableEntitySchema{

    @Prop()
    investment_id: string

    @Prop()
    transaction_date: Date

    @Prop()
    amount:number

    @Prop()
    units:string
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);