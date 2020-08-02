import React, {ReactElement} from 'react';
import {Avatar, Button, Card, Icon, Layout} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {LivePrice} from '../interfaces/LivePrice';
import {PriceOverview} from './PriceOverview';


const BellIcon = (props: any): ReactElement => (
    <Icon {...props} name='bell'/>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    layout: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

const AlertButton = ({ item }: { item: LivePrice }): ReactElement => {

    const navigation = useNavigation();
    const onPress = async (): Promise<void> => {
        navigation.navigate('AlertForm', {
            livePrice: item
        });
    };

    return (<Button
        size='small'
        accessoryRight={BellIcon}
        onPress={(): Promise<void> => onPress()
        }/>);
};

const CoinImage = ({ asset, style }: {  asset: string, style: any }): ReactElement => {
    const images = [
        {
            id: 'btc',
            // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
            image: require('../assets/images/btc.png')
        },
        {
            id: 'eth',
            // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
            image: require('../assets/images/eth.png')
        }
    ];

    const coinImage = images.find(image => image.id.toUpperCase() === asset.toUpperCase()) || 
        // eslint-disable-next-line global-require
        { id: 'unknown', image: require('../assets/images/unknown.jpg') };

    return (
        <Avatar
            style={[style, { tintColor: null }]}
            source={coinImage.image}
        />
    );
};

export function LivePriceRow({ item, index }: { item: LivePrice, index: number}): ReactElement {

    return (
        <Card status='basic'>
            <Layout style={styles.container}>
                <Layout style={styles.layout}>

                    <CoinImage asset={item.asset} style={null} />
                    <PriceOverview item={item} />
                    <AlertButton item={item} />
                </Layout>
            </Layout>
        </Card>
    );
}
