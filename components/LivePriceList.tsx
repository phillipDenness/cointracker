import React, { ReactElement, useEffect, useState } from 'react';
import Toast from 'react-native-simple-toast';
import { StyleSheet } from 'react-native';
import { Card, List, Spinner, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LivePrice } from '../interfaces/LivePrice';
import { LivePriceRow } from './LivePriceRow';
import { Exchanges } from '../constants/Exchanges';


export function LivePriceList({ exchange, fetchLivePrice }: { exchange: Exchanges, fetchLivePrice: any }): ReactElement {
    const [isLoading, setLoading] = useState(true);
    const [livePrice, setLivePrice] = useState<LivePrice[]>([]);

    useEffect(() => {
        const update = async (): Promise<void> => {
            try {
                setLoading(true);
                const productIds = ['BTC-EUR', 'ETH-EUR'];

                const livePrices = await Promise.all(productIds.map(async (productId: string) => {
                    return fetchLivePrice(productId);
                }));

                Toast.show(JSON.stringify(livePrices));
                setLivePrice(livePrices);
            } catch (error) {
                console.error(`Error with request ${error}`);
                Toast.show(`Error with request ${error}`, 200);
            } finally {
                setLoading(false);
            }
        };
        update();
    }, [fetchLivePrice]);

    return (
        <>
            <SafeAreaView>
                <Card>
                    <Text style={styles.topContainer} category="h6">
                        {exchange} Exchange
                    </Text>
                </Card>
                {
                    isLoading || !livePrice ? <Spinner/> : (
                        <List
                            data={livePrice}
                            renderItem={LivePriceRow}
                        />)
                }
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
