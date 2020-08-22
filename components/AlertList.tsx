import React, {ReactElement} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {List} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {AlertRow} from './AlertRow';
import {PriceAlert} from '../interfaces/PriceAlert';

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export function AlertList({ alerts }: { alerts: PriceAlert[] }): ReactElement {

    return (
        <SafeAreaView>
            <List
                data={alerts}
                renderItem={AlertRow}
            />
        </SafeAreaView>
    );
}
