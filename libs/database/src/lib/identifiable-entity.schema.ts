import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export abstract class IdentifiableEntitySchema {
  @Prop({ type: SchemaTypes.ObjectId })
  readonly _id!: Types.ObjectId;
}