import React, { ReactElement, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, List, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as BackgroundFetch from 'expo-background-fetch';
import { AlertRow } from './AlertRow';
import { LOCATION_TASK_NAME } from '../background/BackgroundTask';
import { locationService } from '../contexts/FetchService';
import { LivePrice } from '../interfaces/LivePrice';

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export function AlertsList({ alerts }: { alerts: string[] }): ReactElement {
    const [state, setState] = useState<LivePrice>({
        price: '0',
        percentChange: 0,
        symbol: ''
    });

    const [date, setDate] = useState(new Date());


    const onPress = async (): Promise<void> => {

    };

    useEffect(() => {
        const sub = (async (): Promise<void> => {
            locationService.subscribe(setState);

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
        });
        sub();
    }, []);



    return (
        <SafeAreaView>
            <Card>
                <Text style={styles.topContainer} category="h6">
                    Alerts
                    {JSON.stringify(state)}
                    {JSON.stringify(date)}
                </Text>
            </Card>
            <List
                data={alerts}
                renderItem={AlertRow}
            />
        </SafeAreaView>
    );
}
