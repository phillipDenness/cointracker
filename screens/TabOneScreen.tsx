import * as React from 'react';
import { ActivityIndicator, Button, StyleSheet } from 'react-native';
import Toast from 'react-native-simple-toast';
import { ReactElement, useState } from 'react';
import { Text, View } from '../components/Themed';
import { OkCoinTickerResponse } from '../interfaces/OkCoinTickerResponse';

export default function TabOneScreen(): ReactElement {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<OkCoinTickerResponse>();

    function onClick(): void {
        Toast.show('This is a toast 2');
        fetch('https://www.okcoin.com/api/spot/v3/instruments/BTC-EUR/ticker')
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => Toast.show(`Error with request ${error}`))
            .finally(() => setLoading(false));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>BTC EUR</Text>
            <Button title="Get Price" onPress={onClick}/>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            {!data ? <ActivityIndicator/> : (
                <Text>{data.bid}</Text>
            )}
            {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    }
});
