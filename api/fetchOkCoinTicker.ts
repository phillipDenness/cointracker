import { OkCoinTickerResponse } from '../interfaces/OkCoinTickerResponse';
import { LivePrice } from '../interfaces/LivePrice';
import { Exchanges } from '../constants/Exchanges';

function calculateChange(now: number, start: number): number {
    return ((now - start) / now) * 100;
}

function getAsset(symbol: string): string {
    return symbol.split('-')[0];
}

function getBase(symbol: string): string {
    return symbol.split('-')[1];
}

export async function fetchOkCoinLivePrice(productId: string): Promise<LivePrice> {
    const response = await fetchOkCoinTicker(productId);

    return Promise.resolve({
        price: response.last,
        symbol: response.product_id,
        percentChange: calculateChange(parseInt(response.last, 10), parseInt(response.open_24h, 10)),
        exchange: Exchanges.OKCOIN,
        asset: getAsset(response.product_id),
        base: getBase(response.product_id)
    });
}

async function fetchOkCoinTicker(productId: string): Promise<OkCoinTickerResponse> {
    return fetch(`https://www.okcoin.com/api/spot/v3/instruments/${productId}/ticker`)
        .then(response => response.json());
}
