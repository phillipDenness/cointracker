import React, {ReactElement } from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Card, List, Text} from "@ui-kitten/components";
import {StyleSheet} from "react-native";
import {AlertRow} from "./AlertRow";

export function AlertsList({ alerts }: { alerts: string[] }): ReactElement {

    return (
        <SafeAreaView>
            <Card>
                <Text style={styles.topContainer} category="h6">
                    Alerts
                </Text>
            </Card>
            <List
                data={alerts}
                renderItem={AlertRow}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
