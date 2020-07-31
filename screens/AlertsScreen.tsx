import React, {ReactElement, useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import {AlertsList} from "../components/AlertsList";

export const AlertsScreen = (): ReactElement => {
    const [state, setState] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        const getData = async (): Promise<void> => {
            try {
                const storage = await AsyncStorage.getItem('@storage_Key');
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
        <AlertsList alerts={state} />);
};
