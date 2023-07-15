/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from '@nestjs/mongoose';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [  
    ConfigModule.forRoot({
    envFilePath:".env",
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.DB_URI),
  PdfModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
