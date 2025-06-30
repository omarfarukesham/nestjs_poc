/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Cat {
 @Prop({ required: true })
  name!: string;

@Prop({ required: true })   
color!: string;

@Prop({ required: false })
avatarImg?: string;

}
export const CatSchema = SchemaFactory.createForClass(Cat);