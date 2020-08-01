import {activateKeepAwake} from 'expo-keep-awake';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {Button, Platform} from 'react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import * as TaskManager from 'expo-task-manager';
import {AppNavigator} from './navigation/AppNavigator';
// eslint-disable-next-line import/no-named-default
import {default as theme} from './custom-theme.json';
import useCachedResources from './hooks/useCachedResources';
import {registerFetchTask} from './services/tasks';

const INTERVAL_TASKS = 15;

registerFetchTask('teste', async () => {

    try {
        const storage = await AsyncStorage.getItem('@storage_Key');
        if (storage !== null) {
            console.log(JSON.parse(storage));
        }
        console.log('tried');
    } catch (e) {
        console.error(e);
    }
    console.log('Performing task');
    fetch('https://webhook.site/b7a03194-0034-4291-8b93-cdd6a8f60156').then(() => {
        console.log('done');
    });
}, INTERVAL_TASKS);

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
    })
});

//
// TaskManager.defineTask(LOCATION_TASK_NAME, async () => {
//     try {
//         // const receivedNewData: LivePrice = await fetchOkCoinLivePrice('BTC-EUR');
//         const receivedNewData: LivePrice = {
//             price: '',
//             percentChange: 0,
//             symbol: 'test'
//         };
//         // locationService.setLocation(receivedNewData);
//
//         console.log(receivedNewData);
//         return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
//     } catch (e) {
//         console.error(e);
//         return BackgroundFetch.Result.Failed;
//     }
// });

export default function App(): ReactElement | null {
    const isLoadingComplete = useCachedResources();
    const [ expoPushToken, setExpoPushToken ] = useState<string>('');
    const [notification, setNotification] = useState<Notifications.Notification>();
    const notificationListener = useRef();
    const responseListener = useRef();

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

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
        });

        return (): void => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            Notifications.removeNotificationSubscription(notificationListener);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            Notifications.removeNotificationSubscription(responseListener);
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
                    await TaskManager.unregisterAllTasksAsync();
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


