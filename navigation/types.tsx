import {Exchanges} from '../constants/Exchanges';
import {LivePrice} from '../interfaces/LivePrice';

export type RootStackParamList = {
    LivePriceList: { exchange: Exchanges };
    AlertForm: { livePrice: LivePrice } | undefined;

};
