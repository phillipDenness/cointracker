import React, {ReactElement, useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {AlertList} from '../components/AlertList';
import {ALERTS_KEY} from '../constants/StorageKeys';


export const AlertScreen = (): ReactElement => {
    const [state, setState] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        const getData = async (): Promise<void> => {
            try {
                const storage = await AsyncStorage.getItem(ALERTS_KEY);
                if(storage !== null) {
                    setState(JSON.parse(storage));
                }
            } catch(e) {
                console.error(e);
            }
        };
        getData();
    }, [isFocused]);

    return (
        <AlertList alerts={state} />);
};
