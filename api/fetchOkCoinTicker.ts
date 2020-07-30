import Toast from 'react-native-simple-toast';
import { OkCoinTickerResponse } from '../interfaces/OkCoinTickerResponse';
import { LivePrice } from '../interfaces/LivePrice';

function calculateChange(now: number, start: number): number {
    return ((now - start) / now) * 100;
}

export async function fetchOkCoinLivePrice(productId: string): Promise<LivePrice> {
    const response = await fetchOkCoinTicker(productId);

    return Promise.resolve({
        price: response.last,
        symbol: response.product_id,
        percentChange: calculateChange(parseInt(response.last, 10), parseInt(response.open_24h, 10))
    });
}

async function fetchOkCoinTicker(productId: string): Promise<OkCoinTickerResponse> {
    return fetch(`https://www.okcoin.com/api/spot/v3/instruments/${productId}/ticker`)
        .then(response => response.json());
}
