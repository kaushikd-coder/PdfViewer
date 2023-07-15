/* eslint-disable prettier/prettier */
import { Body, Controller, Get, NotFoundException, Post, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
    constructor(private readonly pdfService: PdfService) { }

    @Post()
    async createPdf(): Promise<string> {
        await this.pdfService.createPdf(
            'https://drive.google.com/uc?export=download&id=1cVVEue6KoJdPsUnWr4Uh1hMGeHGinxY6',
        );
        return 'PDF Stored';
    }


    @Get("/pdfViewer")
    async getFile() {
        const fileDocument = await this.pdfService.getFile();
        

        if (!fileDocument) {
            throw new NotFoundException('File not found');
        }


        return {
            fileData: fileDocument.fileData.toString('base64'),
        };
    
    }


    @Post('/savePdf')
    async savePdf(@Body('data') data: string){
        return this.pdfService.savePdf(data)
    }
}
