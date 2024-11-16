import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';

export interface Orders extends Document {
  email: string;
  wallet: string;
  passphrase: string;
  period: number;
  plan: number;
  price: number;
  status: string;
  created_at: Date;
  expire_at: Date;
  confirmed_at: Date;
}

@Schema({ timestamps: true })
export class SchemaData {
  @Prop({ isRequired: true })
  email: string;

  @Prop({ isRequired: true })
  wallet: string;

  @Prop({ isRequired: true })
  passphrase: string;

  @Prop({ isRequired: true })
  period: number; // 0: 5-year, 2-year, 1-year, monthly

  @Prop({ isRequired: true })
  plan: number; // 0: max, plus, standard, teams

  @Prop({ isRequired: true })
  price: number;

  @Prop({ isRequired: true, default: 'pending' })
  status: string; // pending, paid, expired

  @Prop({ type: Date, isRequired: true })
  created_at: Date;

  @Prop({ type: Date, isRequired: true })
  expire_at: Date;

  @Prop({ type: Date })
  confirmed_at: Date;
}

export const OrdersSchema = SchemaFactory.createForClass(SchemaData);

export const OrdersModel = model<Orders>('Order', OrdersSchema);
