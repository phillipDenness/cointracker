import { Exchanges } from '../constants/Exchanges';

export interface PriceAlert {
    symbol: string,
    exchange: Exchanges,
    priceAbove: string | undefined,
    priceBelow: string | undefined,
    triggerComplete: boolean
}
