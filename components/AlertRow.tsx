import React, {ReactElement} from 'react';
import {Avatar, ListItem} from '@ui-kitten/components';


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

export function AlertRow({ item, index }: { item: string, index: number}): ReactElement {

    return (
        <ListItem
            title={item}
            description="PriceAlert is created"
            accessoryLeft={ItemImage}
        />
    );
}
