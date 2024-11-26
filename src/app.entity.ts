import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';

export type FormDocument = HydratedDocument<Form>;

@Schema({ collection: 'form', timestamps: true })
export class Form {
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: Types.ObjectId;

  @Prop({ require: true, type: String })
  name: string;

  // @Prop({ require: true, type: String, unique: true })
  // email: string;

  @Prop({ require: true, type: String })
  unit: string;

  @Prop({ require: true, type: Number, unique: true })
  number: string;
}

export const FormSchema = SchemaFactory.createForClass(Form);
