import React, {ReactElement} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Tab, TabBar, TabElement} from '@ui-kitten/components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LivePriceScreen} from '../screens/LivePriceScreen';
import {AlertScreen} from '../screens/AlertScreen';

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

export const TabNavigator = (): React.ReactElement => {

    return (<Navigator
        tabBar={(props): ReactElement => <BottomTabBar {...props} />}
    >
        <Screen
            name="Market"
            component={LivePriceScreen}
            options={{ title: 'Market' }}
        />
        <Screen
            name="Alerts"
            component={AlertScreen}
            options={{ title: 'Alerts' }}
        />
    </Navigator>
    );
};

export const AppNavigator = (): ReactElement => {

    return (<NavigationContainer>
        <TabNavigator />
    </NavigationContainer>);
};
