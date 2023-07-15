/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type PdfDocument = Pdf & Document;

@Schema()
export class Pdf {

    @Prop()
    name: string;
    
    @Prop({ required: true })
    fileData: Buffer;
}

export const PdfSchema = SchemaFactory.createForClass(Pdf)