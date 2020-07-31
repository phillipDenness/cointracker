import React, { ReactElement, useEffect, useState } from 'react';
import { NavigationContainer, RouteProp , useIsFocused } from '@react-navigation/native';
import { TabBar, Tab, Layout, Text, TabElement } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';

import { LivePriceScreen } from '../screens/LivePriceScreen';
import {AlertsScreen} from "../screens/AlertsScreen";

const { Navigator, Screen } = createBottomTabNavigator<any>();

const BottomTabBar = ({ navigation, state, descriptors }:
                          { navigation: any, state: any, descriptors: any }): ReactElement => {

    const onTabSelect = (index: number): void => {
        const selectedTabRoute: string = state.routeNames[index];
        navigation.navigate(selectedTabRoute);
    };

    const createNavigationTabForRoute = (route: any): TabElement => {
        const { options } = descriptors[route.key];
        return (
            <Tab
                key={route.key}
                title={options.title}
                icon={options.tabBarIcon}
            />
        );
    };

    return (
        <TabBar selectedIndex={state.index} onSelect={onTabSelect}>
            {state.routes.map(createNavigationTabForRoute)}
        </TabBar>
    );
};

export const HomeNavigator = (): React.ReactElement => {

    return (<Navigator tabBar={(props): ReactElement => <BottomTabBar {...props} />}>
        <Screen
            name="Live Prices"
            component={LivePriceScreen}
            options={{ title: 'Live Prices' }}
        />
        <Screen
            name="Alerts"
            component={AlertsScreen}
            options={{ title: 'Alerts' }}
        />
    </Navigator>
    );
};

export const AppNavigator = (): ReactElement => {

    return (<NavigationContainer>
        <HomeNavigator />
    </NavigationContainer>);
};
