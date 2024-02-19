import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { CryptocurrencyService } from '../cryptocurrency/service/cryptocurrency.service';
import { CryptocurrencyPriceService } from '../cryptocurrency/service/cryptocurrencyPrice.service';
import { KucoinTickerDto } from '../types/kucoinTicker.dto';
import { KucoinApiService } from './services/kucoin-api.service';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private readonly cryptoService: CryptocurrencyService,
    private readonly cryptoPriceService: CryptocurrencyPriceService,
    private readonly kucoinApiService: KucoinApiService,
  ) {}

  @Cron('0/1 * * * *')
  async handleCron() {
    try {
      const kucoinResponse: AxiosResponse<KucoinTickerDto> =
        await this.kucoinApiService.getTickers();

      if (kucoinResponse.status !== 200) {
        throw new Error(
          `Kucoin API request failed with status: ${kucoinResponse.status}`,
        );
      }

      const tickers = kucoinResponse.data.data.ticker;
      const timestamp = kucoinResponse.data.data.time;
      const batchSize = 8;
      const tickersChunks = this.chunkArray(tickers, batchSize);

      await Promise.all(
        tickersChunks.map((chunk) => this.processChunk(chunk, timestamp)),
      );
    } catch (error) {
      this.logger.error(`Error updating data: ${error.message}`);
    }
  }

  private chunkArray(array: KucoinTickerDto['data']['ticker'], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  private async processChunk(
    chunk: KucoinTickerDto['data']['ticker'],
    timestamp: number,
  ): Promise<void> {
    const promises = chunk.map(async (ticker) => {
      if (ticker && ticker.symbolName != null && ticker.last != null) {
        const cryptocurrency = await this.cryptoService.findOrCreate({
          name: ticker.symbolName,
          currentPrice: Number(ticker.last),
        });

        if (
          cryptocurrency &&
          cryptocurrency.id != null &&
          ticker.last != null
        ) {
          await this.cryptoPriceService.createCryptocurrencyPrice({
            cryptocurrencyId: cryptocurrency.id,
            price: parseFloat(ticker.last),
            timestamp: new Date(timestamp),
          });
        } else {
          this.logger.warn(
            `Skipping invalid data for cryptocurrency price creation: ${JSON.stringify(ticker)}`,
          );
        }
      } else {
        this.logger.warn(
          `Skipping invalid data for cryptocurrency: ${JSON.stringify(ticker)}`,
        );
      }
    });
    await Promise.all(promises);
  }
}
