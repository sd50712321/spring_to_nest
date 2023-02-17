import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemserviceModule } from './itemservice/itemservice.module';

@Module({
  imports: [ItemserviceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
