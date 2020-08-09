import React, {ReactElement, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {Button, Card, Divider, Icon, Input, Layout, Radio, RadioGroup, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import {RootStackParamList} from '../navigation/types';
import {PriceAlert} from '../interfaces/PriceAlert';
import {PriceOverview} from '../components/PriceOverview';

type AlertFormScreenRouteProp = RouteProp<RootStackParamList, 'AlertForm'>;
type AlertFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AlertForm'>;
type Props = {
    route: AlertFormScreenRouteProp;
    navigation: AlertFormScreenNavigationProp
};


const BellIcon = (props: any): ReactElement => (
    <Icon {...props} name='bell'/>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    layout: {
        flexDirection: 'row',
        alignContent: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export const storeData = async (value: PriceAlert): Promise<void> => {
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


export const AlertFormScreen = ({ navigation, route }: Props): ReactElement => {

    const { livePrice } = route.params!;
    const [priceAlert, setPriceAlert] = useState<PriceAlert>({
        symbol: livePrice.symbol,
        exchange: livePrice.exchange,
        priceAbove: livePrice.price,
        priceBelow: livePrice.price,
        triggerComplete: false
    });
    const [selectedIndex, setSelectedIndex] = React.useState(0);


    async function onSubmit(): Promise<void> {
        const isPriceAbove = selectedIndex === 0;
        if (isPriceAbove) {
            setPriceAlert( { ...priceAlert, priceBelow: undefined });
            await storeData(priceAlert);
        } if (selectedIndex === 1) {
            setPriceAlert({ ...priceAlert, priceAbove: undefined });
            await storeData(priceAlert);
        }
    }
    
    return (
        <Layout style={styles.container}>
            <Card>
                <Layout style={styles.layout}>
                    <PriceOverview item={livePrice} />
                </Layout>

                <Divider/>
                <Layout style={styles.layout}>
                    <Text category='h6'>
                        Alert me when the {livePrice.asset} price
                    </Text>
                </Layout>
                <Divider/>
                <RadioGroup
                    selectedIndex={selectedIndex}
                    onChange={(index): void => {
                        console.log(index);
                        setSelectedIndex(index);
                    }}>
                    <Radio>Is price greater than</Radio>
                    <Radio>Is price less than</Radio>
                </RadioGroup>

                <Input
                    value={priceAlert.priceAbove}
                    placeholder=''
                    onChangeText={(nextValue): void => setPriceAlert({ ...priceAlert, priceAbove: nextValue })}
                />

                <Input
                    value={priceAlert.priceBelow}
                    placeholder=''
                    onChangeText={(nextValue): void => setPriceAlert({ ...priceAlert, priceBelow: nextValue })}
                />
                <Button 
                    status='primary' 
                    accessoryRight={BellIcon}
                    onPress={onSubmit}
                >
            Alert me
                </Button>
            </Card>
        </Layout>
    );
};
