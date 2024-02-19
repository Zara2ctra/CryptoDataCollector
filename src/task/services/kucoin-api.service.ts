import axios, { AxiosResponse } from 'axios';
import { KucoinTickerDto } from '../../types/kucoinTicker.dto';

export class KucoinApiService {
  async getTickers(): Promise<AxiosResponse<KucoinTickerDto>> {
    return axios.get('https://api.kucoin.com/api/v1/market/allTickers');
  }
}
