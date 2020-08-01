import React, {ReactElement} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LivePriceListScreen} from './LivePriceListScreen';
import {Exchanges} from '../constants/Exchanges';
import {RootStackParamList} from '../navigation/types';
import {AlertFormScreen} from './AlertFormScreen';

const RootStack = createStackNavigator<RootStackParamList>();
export function LivePriceScreen({ navigation }: { navigation: any}): ReactElement {

    return (
        <RootStack.Navigator initialRouteName="LivePriceList">
            <RootStack.Screen
                name="LivePriceList"
                component={LivePriceListScreen}
                initialParams={{ exchange: Exchanges.OKCOIN }}
                options={{ title: 'Market' }}
            />
            <RootStack.Screen
                name="AlertForm"
                component={AlertFormScreen}
                options={{ title: 'Create Alert' }}
            />
        </RootStack.Navigator>
    );
}
