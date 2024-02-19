import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';
import { CryptocurrencyService } from '../cryptocurrency/service/cryptocurrency.service';
import { CryptocurrencyPriceService } from '../cryptocurrency/service/cryptocurrencyPrice.service';
import { KucoinApiService } from './services/kucoin-api.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    TaskService,
    CryptocurrencyService,
    CryptocurrencyPriceService,
    KucoinApiService,
  ],
})
export class TaskModule {}
