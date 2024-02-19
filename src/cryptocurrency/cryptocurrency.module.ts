import { Module } from '@nestjs/common';
import { CryptocurrencyController } from './controller/cryptocurrency.controller';
import { CryptocurrencyService } from './service/cryptocurrency.service';
import { CryptocurrencyPriceService } from './service/cryptocurrencyPrice.service';

@Module({
  imports: [],
  controllers: [CryptocurrencyController],
  providers: [CryptocurrencyService, CryptocurrencyPriceService],
})
export class CryptocurrencyModule {}
