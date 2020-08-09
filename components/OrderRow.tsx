import React, {ReactElement} from 'react';
import {Card, ListItem, Text} from '@ui-kitten/components';
import {Order} from '../interfaces/Order';


export function OrderRow({ item, index }: { item: Order, index: number}): ReactElement {

    function minSellPrice(): string {
        const price = parseFloat(item.purchasePrice);
        const sellFee = parseFloat(item.sellFeePercent);
        const purchaseFee = parseFloat(item.purchaseFeePercent);

        const sellPrice = price + ((price/100) * (sellFee + purchaseFee));
        return sellPrice.toString();
    }

    return (
        <ListItem
            title={`Purchase ${item.asset} - Active`}
            description={(): ReactElement => {
                return (
                    <Card>
                        <Text>{`${item.purchasePrice} ${item.base} @ ${item.date}`}</Text>
                        <Text>{`Break even at ${minSellPrice()}`}</Text>
                    </Card>
                );
            }}
        />
    );
}

