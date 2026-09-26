import { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import AppFlashMessage from '@components/AppFlashMessage';
import { showAppMessage } from '@services/flashMessage';
import { ensurePermission } from '@services/permissions';

export default function Scanner() {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const device = useCameraDevice('back');

    const handleScan = async () => {
        const result = await ensurePermission('camera');

        if (result === 'granted') {
            setIsCameraOpen(true);
            return;
        }

        showAppMessage({
            message: 'Camera',
            description: result === 'blocked'
                ? 'Camera access is blocked. Allow it in settings'
                : 'Camera access is required to scan',
            type: 'warning',
        });

        if (result === 'blocked') {
            Linking.openSettings();
        }
    };

    if (isCameraOpen && device) {
        return <Camera style={StyleSheet.absoluteFill} device={device} isActive />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scanner</Text>
            <Pressable style={styles.button} onPress={handleScan}>
                <Text style={styles.buttonText}>Scan</Text>
            </Pressable>
            <AppFlashMessage />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#2f6fed',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});
