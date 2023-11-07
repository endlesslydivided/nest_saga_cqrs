import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IdentifiableEntitySchema } from "@app/libs/database";

@Schema({versionKey: false, collection: 'investments'})
export class Investment extends IdentifiableEntitySchema{

    @Prop()
    name: string

    @Prop()
    description: string

    @Prop()
    startDate:Date

    @Prop()
    endDate:Date

    @Prop()
    initialAmount:number

    @Prop()
    currentValue:number
}

export const InvestmentSchema = SchemaFactory.createForClass(Investment);