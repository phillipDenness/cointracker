import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ReactElement } from 'react';
import { RootStackParamList } from '../types';

export default function NotFoundScreen({
    navigation
}: StackScreenProps<RootStackParamList, 'NotFound'>): ReactElement {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>This screen doesnt exist.</Text>
            <TouchableOpacity onPress={(): void => navigation.replace('Root')} style={styles.link}>
                <Text style={styles.linkText}>Go to home screen!</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    link: {
        marginTop: 15,
        paddingVertical: 15
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7'
    }
});
