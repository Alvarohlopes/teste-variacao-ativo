export interface ActivesModel {
  name: string;
  value: string;
}

export interface ActiveResponse {
  chart: ChartModel;
}

export interface ChartModel {
  error: any
  result: ChartResponseModel[];
}

export interface ChartResponseModel {
  indicators: any;
  meta: MetaModel;
  timestamp: number[];
}

export interface MetaModel {
  chartPreviousClose: number;
  currency: string;
  currentTradingPeriod: any[]
  dataGranularity: string;
  exchangeName: string;
  exchangeTimezoneName: string;
  firstTradeDate: number;
  gmtoffset: number;
  instrumentType: string;
  priceHint: number;
  range: string;
  regularMarketPrice: number;
  regularMarketTime: number;
  symbol: string;
  timezone: string;
  validRanges: any[];
}

export interface TableModel {
  day: number;
  date: string;
  value: number;
  valueYesterday: string;
  valueFirstDay: string;
}