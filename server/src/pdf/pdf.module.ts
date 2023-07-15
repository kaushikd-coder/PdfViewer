/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PdfSchema } from './schema/pdf.model';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name: 'Pdf',
      schema: PdfSchema
    }])
  ],
  controllers: [PdfController],
  providers: [PdfService]
})
export class PdfModule {}
