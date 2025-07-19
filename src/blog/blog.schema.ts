// blog/blog.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt
export class Blog {
  @Prop({ required: true })
  blogTitle!: string;

  @Prop({ required: true })
  details!: string;

  // @Prop({ required: true })
  // author!: string;

  @Prop({ default: false })
  isPublished!: boolean;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
