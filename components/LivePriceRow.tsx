import React, { ReactElement } from 'react';
import { Avatar, Button, ListItem } from '@ui-kitten/components';
import { LivePrice } from '../interfaces/LivePrice';

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

export const LivePriceRow = ({ item, index }: { item: LivePrice, index: number}): ReactElement => (
    <ListItem
        title={item.symbol}
        description={item.price}
        accessoryLeft={ItemImage}
        accessoryRight={InstallButton}
    />
);
