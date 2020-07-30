import React, {ReactElement, useEffect, useState} from 'react';
import {Avatar, Button, ListItem, Spinner} from '@ui-kitten/components';
import { LivePrice } from '../interfaces/LivePrice';
import Toast from "react-native-simple-toast";

const InstallButton = (props: any): ReactElement => (
    <Button size='small'>
        Alert
    </Button>
);

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
                description={item.price + ' ' + item.percentChange.toFixed(2)}
                accessoryLeft={ItemImage}
                accessoryRight={InstallButton}
            />
    )
}
