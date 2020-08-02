import React, {ReactElement} from 'react';
import {Avatar, ListItem} from '@ui-kitten/components';
import {PriceAlert} from '../interfaces/PriceAlert';


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

export function AlertRow({ item, index }: { item: PriceAlert, index: number}): ReactElement {

    const greaterThanLessThan = item.priceAbove === undefined ? '<' : '>';
    const price = item.priceAbove === undefined ? item.priceBelow :item.priceAbove;
    return (
        <ListItem
            title={item.symbol}
            description={`Trigger on ${greaterThanLessThan} ${price} ${item.triggerComplete}`}
            accessoryLeft={ItemImage}
        />
    );
}

