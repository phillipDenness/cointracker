import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, Card, Divider, IndexPath, Input, Layout, Select, SelectItem, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-simple-toast';
import { Order } from '../interfaces/Order';
import { ORDERS_KEY } from '../constants/StorageKeys';

const styles = StyleSheet.create({
    layout: {
        flexDirection: 'row',
        alignContent: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    select: {
        flex: 1,
        margin: 2
    }
});

const baseData = [
    'eur',
    'gbp'
];

const assetData = [
    'btc',
    'eth'
];

const storeData = async (value: Order): Promise<void> => {
    try {
        const storedData = await AsyncStorage.getItem(ORDERS_KEY);
        let existingData = [];
        if (storedData) {
            existingData = JSON.parse(storedData);
        }
        existingData.push(value);
        Toast.show(JSON.stringify(existingData));
        await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(existingData));
    } catch (e) {
        console.error(e);
    }
};

export const OrderFormScreen = (): ReactElement => {
    const initialOrder: Order = {
        sellFeePercent: '0.2',
        purchaseFeePercent: '0.2',
        base: '',
        asset: '',
        purchasePrice: '',
        date: new Date()
    };
    const navigation = useNavigation();
    const [order, setOrder] = useState<Order>(initialOrder);
    const [baseSelectedIndex, setBaseSelectedIndex] = React.useState(new IndexPath(0));
    const selectedBase = baseData[baseSelectedIndex.row];
    const [assetSelectedIndex, setAssetSelectedIndex] = React.useState(new IndexPath(0));
    const selectedAsset = assetData[assetSelectedIndex.row];

    useEffect(() => {
        const update = (): void => {
            setOrder((currentOrder) => {
                currentOrder.asset = assetData[assetSelectedIndex.row];
                currentOrder.base = baseData[baseSelectedIndex.row];
                return currentOrder;
            });
        };
        update();
    }, [baseSelectedIndex, assetSelectedIndex]);


    const renderOption = (title: string): ReactElement => (
        <SelectItem title={title} key={title} />
    );

    const saveOrder = async(): Promise<void> => {
        if (order.purchasePrice === '' ||
            order.base === '' ||
            order.asset === '' ||
            order.sellFeePercent === '' ||
            order.purchaseFeePercent === '') {
            
            Toast.show('Order is not complete');
        }
        try {
            [order.purchaseFeePercent, order.sellFeePercent, order.purchaseFeePercent]
                .map(stringNumber => parseFloat(stringNumber));
        } catch (e) {
            Toast.show('Must be valid number');
        }
        await storeData({ ...order, date: new Date() });
        setOrder(initialOrder);
        navigation.navigate('Orders');
    };

    return (
        <Card>
            <Layout style={styles.layout}>
                <Text category='h6'>
                        Register order
                </Text>
            </Layout>
            <Layout style={styles.container} level='1'>
                <Select
                    style={styles.select}
                    placeholder='Base'
                    value={selectedBase}
                    selectedIndex={baseSelectedIndex}
                    onSelect={(index): void => setBaseSelectedIndex(index as IndexPath)}>
                    {baseData.map(renderOption)}
                </Select>
                <Select
                    style={styles.select}
                    placeholder='Asset'
                    value={selectedAsset}
                    selectedIndex={assetSelectedIndex}
                    onSelect={(index): void => setAssetSelectedIndex(index as IndexPath)}>
                    {assetData.map(renderOption)}
                </Select>
            </Layout>
            <Input
                label='Price'
                keyboardType="phone-pad"
                value={order.purchasePrice}
                placeholder=''
                onChangeText={(nextValue): void => setOrder({ ...order, purchasePrice: nextValue })}
            />
            <Layout style={styles.container} level='1'>
                <Input
                    style={styles.select}
                    label='Purchase fee percent'
                    keyboardType="phone-pad"
                    value={order.purchaseFeePercent.toString()}
                    placeholder=''
                    onChangeText={(nextValue): void => setOrder({ ...order, purchaseFeePercent: nextValue })}
                />
                <Input
                    style={styles.select}
                    label='Selling fee percent'
                    keyboardType="phone-pad"
                    value={order.sellFeePercent.toString()}
                    placeholder=''
                    onChangeText={(nextValue): void => setOrder({ ...order, sellFeePercent: nextValue })}
                />
            </Layout>
            <Divider />
            <Button onPress={saveOrder} >Save</Button>
        </Card>);
};
