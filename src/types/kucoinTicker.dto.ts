export interface KucoinTickerDto {
  code: string;
  data: {
    time: number;
    ticker: KucoinTicker[];
  };
}

export class KucoinTicker {
  symbol: string;
  symbolName: string;
  buy: string;
  bestBidSize: string;
  sell: string;
  bestAskSize: string;
  changeRate: string;
  changePrice: string;
  high: string;
  low: string;
  vol: string;
  volValue: string;
  last: string;
  averagePrice: string;
  takerFeeRate: string;
  makerFeeRate: string;
  takerCoefficient: string;
  makerCoefficient: string;
}
