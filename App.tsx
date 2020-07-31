import { StatusBar } from 'expo-status-bar';

import { activateKeepAwake } from 'expo-keep-awake';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import { AppNavigator } from './navigation/AppNavigator';
// eslint-disable-next-line import/no-named-default
import { default as theme } from './custom-theme.json';
import useColorScheme from './hooks/useColorScheme';
import useCachedResources from './hooks/useCachedResources';

// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: false,
//         shouldSetBadge: false,
//     }),
// });
//
// export default function App() {
//     const [expoPushToken, setExpoPushToken] = useState('');
//     const [notification, setNotification] = useState(false);
//     const notificationListener = useRef();
//     const responseListener = useRef();
//
//     useEffect(() => {
//         registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
//
//         notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//             setNotification(notification);
//         });
//
//         responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//             console.log(response);
//         });
//
//         return () => {
//             Notifications.removeNotificationSubscription(notificationListener);
//             Notifications.removeNotificationSubscription(responseListener);
//         };
//     }, []);
//
//     return (
//         <View
//             style={{
//                 flex: 1,
//                 alignItems: 'center',
//                 justifyContent: 'space-around',
//             }}>
//             <Text>Your expo push token: {expoPushToken}</Text>
//             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//                 <Text>Title: {notification && notification.request.content.title} </Text>
//                 <Text>Body: {notification && notification.request.content.body}</Text>
//                 <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
//             </View>
//             <Button
//                 title="Press to Send Notification"
//                 onPress={async () => {
//                     await sendPushNotification(expoPushToken);
//                 }}
//             />
//         </View>
//     );
// }
//

export default function App(): ReactElement | null {
    const isLoadingComplete = useCachedResources();
    const [ expoPushToken, setExpoPushToken ] = useState<string>('');
    const [notification, setNotification] = useState<Notifications.Notification>();
    const notificationListener = useRef();

    activateKeepAwake();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            if (token !== undefined) {
                setExpoPushToken(token);
            }
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notificationListener.current = Notifications.addNotificationReceivedListener((notif) => {
            setNotification(notif);
        });

        return (): void => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            Notifications.removeNotificationSubscription(notificationListener);
        };
    }, []);

    if (!isLoadingComplete) {
        return null;
    }
    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
                <AppNavigator />
            </ApplicationProvider>
            <Button
                title="Press to Send Notification & delete local storage"
                onPress={async (): Promise<void> => {
                    await AsyncStorage.removeItem('@storage_Key');
                    await sendPushNotification(expoPushToken);
                }}
            />
        </>
    );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
async function sendPushNotification(expoPushToken: string): Promise<void> {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { data: 'goes here' }
    };
    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    });
}

async function registerForPushNotificationsAsync(): Promise<string | undefined> {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C'
        });
    }

    // eslint-disable-next-line consistent-return
    return token;
}

