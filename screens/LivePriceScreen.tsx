import React, { ReactElement } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { LivePriceList } from '../components/LivePriceList';
import { Exchanges } from '../constants/Exchanges';
import { fetchOkCoinLivePrice } from '../api/fetchOkCoinTicker';


export function LivePriceScreen(): ReactElement {

    return (
        <LivePriceList exchange={Exchanges.OKCOIN} fetchLivePrice={fetchOkCoinLivePrice}/>
    );
}
