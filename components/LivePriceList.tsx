import React, { ReactElement, useEffect, useState } from 'react';
import Toast from 'react-native-simple-toast';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, List, Spinner, Text } from '@ui-kitten/components';
import { LivePrice } from '../interfaces/LivePrice';
import { LivePriceRow } from './LivePriceRow';
import { Exchanges } from '../constants/Exchanges';


export function LivePriceList({ exchange, fetchLivePrice }: { exchange: Exchanges, fetchLivePrice: any }): ReactElement {

    const [data, setData] = useState<LivePrice[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const update = async (): Promise<void> => {
            try {
                setLoading(true);
                const productIds = ['BTC-EUR', 'ETH-EUR'];

                productIds.map(async (productId: string) => {
                    const livePrice = await fetchLivePrice(productId);

                    Toast.show(JSON.stringify(livePrice));
                    // Toast.show(livePrice.symbol);
                    setData( (currentState) => {
                        const existingIndex = currentState.findIndex(d => d.symbol === livePrice.symbol);
                        if (existingIndex) {
                            return currentState.map((d) => {
                                if (d.symbol === livePrice.symbol) {
                                    d.price = livePrice.price;
                                }
                                return d;
                            });
                        }
                        currentState.push(livePrice);
                        return currentState;
                    });
                });

            } catch (error) {
                console.error(`Error with request ${error}`);
                Toast.show(`Error with request ${error}`);
            } finally {
                setLoading(false);
            }
        };
        update();
    }, [fetchLivePrice]);

    return (
        <>
            <Card>
                <Text style={styles.topContainer} category="h6">
                    {exchange} Exchange
                </Text>
            </Card>
            {isLoading ? <Spinner/> : (
                <List
                    data={data}
                    renderItem={LivePriceRow}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
