import { StatusBar } from 'expo-status-bar';

import { activateKeepAwake } from 'expo-keep-awake';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
// eslint-disable-next-line import/no-named-default
import { default as theme } from './custom-theme.json';
import { AppNavigator } from './navigation/AppNavigator';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
            <Text>Your expo push token: {expoPushToken}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Title: {notification && notification.request.content.title} </Text>
                <Text>Body: {notification && notification.request.content.body}</Text>
                <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View>
            <Button
                title="Press to Send Notification"
                onPress={async () => {
                    await sendPushNotification(expoPushToken);
                }}
            />
        </View>
    );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { data: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
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
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

//
// export default function App(): ReactElement | null {
//     const isLoadingComplete = useCachedResources();
//     const colorScheme = useColorScheme();
//
//     activateKeepAwake();
//     const registerForPushNotificationsAsync = async () => {
//         if (Constants.isDevice) {
//             const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//             let finalStatus = existingStatus;
//             if (existingStatus !== 'granted') {
//                 const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//                 finalStatus = status;
//             }
//             if (finalStatus !== 'granted') {
//                 alert('Failed to get push token for push notification!');
//                 return;
//             }
//             const token = await Notifications.getExpoPushTokenAsync();
//             console.log(token);
//             this.setState({ expoPushToken: token });
//         } else {
//             alert('Must use physical device for Push Notifications');
//         }
//
//         if (Platform.OS === 'android') {
//             Notifications.createChannelAndroidAsync('default', {
//                 name: 'default',
//                 sound: true,
//                 priority: 'max',
//                 vibrate: [0, 250, 250, 250],
//             });
//         }
//     };
//
//     if (!isLoadingComplete) {
//         return null;
//     }
//     return (
//         <>
//             <IconRegistry icons={EvaIconsPack} />
//                 <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
//                     <AppNavigator />
//                 </ApplicationProvider>
//         </>
//     );
//
// }
