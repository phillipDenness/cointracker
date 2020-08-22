import React, {ReactElement, useEffect, useState} from 'react';
import Toast from 'react-native-simple-toast';
import {Card, List, Spinner, Text} from '@ui-kitten/components';
import {StackNavigationProp} from '@react-navigation/stack';
import {CompositeNavigationProp, RouteProp, useIsFocused} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {LivePrice} from '../interfaces/LivePrice';
import {LivePriceRow} from '../components/LivePriceRow';
import {RootStackParamList} from '../navigation/types';
import {fetchOkCoinLivePrice} from '../api/fetchOkCoinTicker';
import {formatDate} from '../services/dateUtils';


type LivePriceScreenRouteProp = RouteProp<RootStackParamList, 'LivePriceList'>;

type LivePriceScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, 'LivePriceList'>,
    BottomTabNavigationProp<any>
    >;

type Props = {
    route: LivePriceScreenRouteProp;
    navigation: LivePriceScreenNavigationProp
};


export function LivePriceListScreen({ route, navigation }: Props): ReactElement {
    const [isLoading, setLoading] = useState(true);
    const [livePrice, setLivePrice] = useState<LivePrice[]>([]);
    const [base, setBase] = useState('EUR');
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const isFocused = useIsFocused();
    
    useEffect(() => {

        const update = async (): Promise<void> => {
            try {
                navigation.setOptions({ title: `Market ${base}` });
                const productIds = ['BTC-EUR', 'ETH-EUR'];

                const livePrices = await Promise.all(productIds.map(async (productId: string) => {
                    return fetchOkCoinLivePrice(productId);
                }));

                // Toast.show(JSON.stringify(livePrices));
                setLastUpdated(new Date());
                setLivePrice(livePrices);
            } catch (error) {
                console.error(`Error with request ${error}`);
                Toast.show(`Error with request ${error}`, 200);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        update();
        const intervalId = setInterval( () => {
            update();
        }, 15000);

        return (): void => clearInterval(intervalId);
    }, [base, navigation, isFocused]);

    return (
        <>
            {

                isLoading || !livePrice ? <Spinner/> : (
                    <>
                        <Card status='basic'>
                            <Text>
                            Last Updated {formatDate(lastUpdated)}
                            </Text>
                        </Card>
                        <List
                            data={livePrice}
                            renderItem={LivePriceRow}
                        />
                    </>)
            }
        </>
    );
}


