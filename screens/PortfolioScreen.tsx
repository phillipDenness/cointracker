import React, {ReactElement, useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Divider, List} from '@ui-kitten/components';
import {ORDERS_KEY} from '../constants/StorageKeys';
import {Order} from '../interfaces/Order';
import {OrderRow} from '../components/OrderRow';


export const PortfolioScreen = (): ReactElement => {
    const [state, setState] = useState<Order[]>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        const getData = async (): Promise<void> => {
            try {
                const storage = await AsyncStorage.getItem(ORDERS_KEY);
                if(storage !== null) {
                    setState(JSON.parse(storage));
                }
            } catch(e) {
                console.error(e);
            }
        };
        getData();
    }, [isFocused]);

    return (
        <SafeAreaView>
            <List
                data={state}
                renderItem={OrderRow}
                ItemSeparatorComponent={Divider}
            />
        </SafeAreaView>);
};
