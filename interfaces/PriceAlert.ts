import {Exchanges} from '../constants/Exchanges';

export interface PriceAlert {
    symbol: string,
    exchange: Exchanges,
    priceAbove: number | undefined,
    priceBelow: number | undefined
}
