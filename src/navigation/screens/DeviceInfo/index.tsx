import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    getModel,
    getSystemVersion,
    getVersion,
    getBuildNumber,
    isEmulator,
    getUniqueId,
} from 'react-native-device-info';
import { getDeviceToken, requestNotificationPermission } from '@services/pushNotifications';

type AsyncInfo = {
    isEmulator: boolean | null;
    uniqueId: string | null;
};

export default function DeviceInfo() {
    const [asyncInfo, setAsyncInfo] = useState<AsyncInfo>({ isEmulator: null, uniqueId: null });
    const [pushToken, setPushToken] = useState<string | null>(null);
    const [pushError, setPushError] = useState<string | null>(null);

    useEffect(() => {
        async function loadAsyncInfo() {
            const [emulator, uniqueId] = await Promise.all([isEmulator(), getUniqueId()]);
            setAsyncInfo({ isEmulator: emulator, uniqueId });
        }

        async function loadPushToken() {
            try {
                const granted = await requestNotificationPermission();

                if (!granted) {
                    setPushError('Notification permission denied');
                    return;
                }

                setPushToken(await getDeviceToken());
            } catch {
                setPushError('Failed to get push token — is Firebase configured for this app?');
            }
        }

        loadAsyncInfo();
        loadPushToken();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Device info</Text>
            <Text style={styles.row}>Model: {getModel()}</Text>
            <Text style={styles.row}>OS version: {getSystemVersion()}</Text>
            <Text style={styles.row}>App version: {getVersion()} ({getBuildNumber()})</Text>
            <Text style={styles.row}>
                Is emulator: {asyncInfo.isEmulator === null ? 'loading…' : String(asyncInfo.isEmulator)}
            </Text>
            <Text style={styles.row}>
                Unique ID: {asyncInfo.uniqueId ?? 'loading…'}
            </Text>
            <Text style={styles.row} selectable>
                Push token: {pushError ?? pushToken ?? 'loading…'}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    row: {
        fontSize: 14,
        color: '#666',
    },
});
