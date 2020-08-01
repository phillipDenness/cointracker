import React, { ReactElement } from 'react';
import { Avatar, Button, ListItem } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Permissions from 'expo-permissions';
import { LivePrice } from '../interfaces/LivePrice';
import { LOCATION_TASK_NAME } from '../background/BackgroundTask';

const AlertButton = (): ReactElement => {

    const onPress = async (): Promise<void> => {
        storeData('test');

        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS,
            Permissions.USER_FACING_NOTIFICATIONS);

        if (status === 'granted') {
            try {
                await BackgroundFetch.registerTaskAsync(LOCATION_TASK_NAME, {
                    minimumInterval: 30
                });
                console.log('Task registers');
            } catch (e) {
                console.error(e);
            }
        }
    };

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

    return (<Button size='small' onPress={(): Promise<void> => onPress()}>
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
