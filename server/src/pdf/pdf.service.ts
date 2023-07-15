/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pdf, PdfDocument } from './schema/pdf.model';
import { Model } from 'mongoose';
import axios from 'axios';
import {isBase64} from 'is-base64';

@Injectable()
export class PdfService {
    constructor(
        @InjectModel(Pdf.name) private readonly pdfModel : Model<PdfDocument> 
    ){}

    async createPdf(fileLink: string){
        try {
            const response = await axios.get(fileLink, {
                responseType: 'arraybuffer'
            });
            // console.log("PDF stored successfully in MongoDB", response)
            const pdfBuffer = Buffer.from(response.data, 'binary');

            // Delete existing PDF
            await this.pdfModel.deleteMany({});
    
            const createPdf = new this.pdfModel({ name: 'example.pdf'});
            createPdf.fileData = pdfBuffer;
    
            return await createPdf.save();
            
        } catch (error) {
            console.error('Error storing PDF:', error);
        }
    }

    async getFile(): Promise<PdfDocument>{
        return this.pdfModel.findOne().exec();
    }


    // async savePdf(base64Data: string): Promise<PdfDocument> {
    //     // console.log('savePdf function called with data:', base64Data);
    //     console.log('Received updated data from client:', base64Data);
    //     console.log('Saving updated document to database:');
    //     const binaryData = Buffer.from(base64Data, 'base64');
    //     const fileName = 'example.pdf';
        

    //     // Look for an existing document with the same fileName
    //     const existingPdf = await this.pdfModel.findOne({ name:fileName }).exec();

    //     if (existingPdf) {
    //         // If a document exists, overwrite the file data
    //         existingPdf.fileData = binaryData;
    //         return await existingPdf.save();
    //     } else {
    //         // Otherwise, create a new document
    //         const createPdf = new this.pdfModel();
    //         createPdf.fileData = binaryData;
    //         createPdf.name = fileName;
    //         return await createPdf.save();
    //     }
    // }

    async savePdf(base64Data: string): Promise<PdfDocument> {
        if (!isBase64(base64Data)) {
            throw new Error('Invalid base64Data');
        }
        const binaryData = Buffer.from(base64Data, 'base64');
    
        // Look for an existing document
        const existingPdf = await this.pdfModel.findOne().exec();
    
        if (existingPdf) {
            // Save a copy of the previous data
            const previousData = existingPdf.fileData;
    
            // Overwrite the file data with the updated data
            existingPdf.fileData = binaryData;
    
            // Compare the previous data with the updated data
            if (previousData.toString('base64') !== base64Data) {
                console.log('The updated data is different from the previous data');
            } else {
                console.log('The updated data is the same as the previous data');
            }
    
            return await existingPdf.save();
        } else {
            throw new Error('No existing PDF to update');
        }
    }
    
}
