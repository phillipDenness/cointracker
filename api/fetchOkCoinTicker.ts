import Toast from 'react-native-simple-toast';
import { OkCoinTickerResponse } from '../interfaces/OkCoinTickerResponse';
import { LivePrice } from '../interfaces/LivePrice';

export async function fetchOkCoinLivePrice(productId: string): Promise<LivePrice> {
    const response = await fetchOkCoinTicker(productId);

    return Promise.resolve({
        price: response.bid,
        symbol: response.product_id
    });
}

async function fetchOkCoinTicker(productId: string): Promise<OkCoinTickerResponse> {
    return fetch(`https://www.okcoin.com/api/spot/v3/instruments/${productId}/ticker`)
        .then(response => response.json());
}
