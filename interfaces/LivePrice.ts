import { Exchanges } from '../constants/Exchanges';

export interface LivePrice {
    asset: string,
    base: string,
    price: string,
    symbol: string,
    percentChange: number,
    exchange: Exchanges
}
