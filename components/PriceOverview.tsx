import React, {ReactElement} from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {LivePrice} from '../interfaces/LivePrice';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    layout: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});


export function PriceOverview({ item }: { item: LivePrice }): ReactElement {

    return (
        <Layout style={styles.layout}>
            <Text>
                {`${item.asset} ${item.price  } 24 Hour ${  item.percentChange.toFixed(2)}`}
            </Text>
        </Layout>
    );
}
