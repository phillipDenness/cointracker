import React, {ReactElement} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Icon, Tab, TabBar, TabElement} from '@ui-kitten/components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {LivePriceScreen} from '../screens/LivePriceScreen';
import {AlertScreen} from '../screens/AlertScreen';
import {OrderFormScreen} from '../screens/OrderFormScreen';
import {PortfolioScreen} from '../screens/PortfolioScreen';

const { Navigator, Screen } = createBottomTabNavigator<any>();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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

export const DrawerNavigator = (): ReactElement => (
    <Drawer.Navigator
        openByDefault
        initialRouteName="Market"
    >
        <Drawer.Screen
            name='Market'
            component={TabNavigator}
        />
        <Drawer.Screen
            name='Create Order'
            component={OrderFormScreen}
        />
        <Drawer.Screen
            name='Portfolio'
            component={PortfolioScreen}
            options={{
                title: 'Portfolio'
            }}
        />
    </Drawer.Navigator>
);


export const AppNavigator = (): ReactElement => {
    const BellIcon = (props: any): ReactElement => (
        <Icon {...props} name='bell'/>
    );

    return (<NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={DrawerNavigator}
                options={{
                    headerLeft: BellIcon
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>);
};
