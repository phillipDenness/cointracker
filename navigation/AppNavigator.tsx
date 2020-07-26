import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabBar, Tab, Layout, Text } from '@ui-kitten/components';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';
import { LivePriceScreen } from '../screens/LivePriceScreen';

const { Navigator, Screen } = createBottomTabNavigator();


const OrdersScreen = (): ReactElement => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>ORDERS</Text>
    </Layout>
);

const TopTabBar = ({ navigation, state }: { navigation: any, state: any }): any => (
    <TabBar
        selectedIndex={state.index}
        onSelect={(index): void => navigation.navigate(state.routeNames[index])}>
        <Tab title='LIVE PRICES'/>
        <Tab title='ORDERS'/>
    </TabBar>
);

const TabNavigator = (): ReactElement => (
    <Navigator tabBar={ (props: any): any => <TopTabBar {...props} />}>
        <Screen name='Live Prices' component={LivePriceScreen}/>
        <Screen name='Orders' component={OrdersScreen}/>
    </Navigator>
);

export const AppNavigator = (): ReactElement => (
    <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
            <TabNavigator />
        </SafeAreaView>
    </NavigationContainer>
);
