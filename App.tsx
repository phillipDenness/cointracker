import { StatusBar } from 'expo-status-bar';
import React, { ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { activateKeepAwake } from 'expo-keep-awake';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App(): ReactElement | null {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    activateKeepAwake();

    if (!isLoadingComplete) {
        return null;
    } 
    return (
        <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
        </SafeAreaProvider>
    );
  
}
