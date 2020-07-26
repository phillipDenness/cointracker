import { StatusBar } from 'expo-status-bar';
import React, { ReactElement } from 'react';

import { activateKeepAwake } from 'expo-keep-awake';
import { ApplicationProvider, Button, IconRegistry, TopNavigation } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaView } from 'react-native'; // <-- Import app theme
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
// eslint-disable-next-line import/no-named-default
import { default as theme } from './custom-theme.json';
import { AppNavigator } from './navigation/AppNavigator';

export default function App(): ReactElement | null {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    
    activateKeepAwake();

    if (!isLoadingComplete) {
        return null;
    }
    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <SafeAreaView style={{ flex: 1 }} >
                <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
                    <AppNavigator />
                </ApplicationProvider>
            </SafeAreaView>
        </>
    );
  
}
