import React, { ReactElement } from 'react';
import { Avatar, Button, ListItem } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { LivePrice } from '../interfaces/LivePrice';

const AlertButton = (props: any): ReactElement => {

    const storeData = async (value: string): Promise<void> => {
        try {
            const storedData = await AsyncStorage.getItem('@storage_Key');
            let existingData = [];
            if (storedData) {
                existingData = JSON.parse(storedData);
            }
            existingData.push(value);
            Toast.show(JSON.stringify(existingData));
            await AsyncStorage.setItem('@storage_Key', JSON.stringify(existingData));
        } catch (e) {
            console.error(e);
        }
    };

    return (<Button size='small' onPress={(): Promise<void> => storeData('alertId')}>
        Alert
    </Button>);
};

const ItemImage = (props: any): ReactElement => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const image = require('../assets/images/okcoin.png');
    return (
        <Avatar
            {...props}
            style={[props.style, { tintColor: null }]}
            source={image}
        />
    );
};

export function LivePriceRow({ item, index }: { item: LivePrice, index: number}): ReactElement {

    return (
        <ListItem
            title={item.symbol}
            description={`${item.price  } 24 Hour ${  item.percentChange.toFixed(2)}`}
            accessoryLeft={ItemImage}
            accessoryRight={AlertButton}
        />
    );
}
