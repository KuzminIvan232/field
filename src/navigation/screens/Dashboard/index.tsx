import { useEffect, useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Geolocation from '@react-native-community/geolocation';
import AppFlashMessage from '@components/AppFlashMessage';
import { ScreenNames } from '@navigation/screenNames';
import { ensurePermission } from '@services/permissions';
import { showAppMessage } from '@services/flashMessage';
import { useNetworkStatus } from '@hooks/useNetworkStatus';

type DashboardProps = {
    componentId: string;
    courseId?: string;
};

export default function Dashboard({ componentId, courseId }: DashboardProps) {
    const [position, setPosition] = useState<{ latitude: number; longitude: number } | null>(null);
    const { isConnected } = useNetworkStatus();

    // A push notification with `data.courseId` landed us here — open that course.
    useEffect(() => {
        if (courseId) {
            Navigation.push(componentId, {
                component: {
                    name: ScreenNames.CourseDetails,
                    passProps: { courseId },
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenProfile = () => {
        Navigation.push(componentId, {
            component: {
                name: ScreenNames.Profile,
                passProps: {
                    userId: 'user1',
                },
            },
        });
    };

    const handleOpenScanner = () => {
        Navigation.push(componentId, {
            component: { name: ScreenNames.Scanner },
        });
    };

    const handleOpenWebView = () => {
        Navigation.push(componentId, {
            component: { name: ScreenNames.WebView },
        });
    };

    const handleOpenCourseDetails = () => {
        Navigation.push(componentId, {
            component: { name: ScreenNames.CourseDetails },
        });
    };

    const handleOpenCourses = () => {
        Navigation.push(componentId, {
            component: { name: ScreenNames.Courses },
        });
    };

    const handleGetPosition = async () => {
        const result = await ensurePermission('location');

        if (result !== 'granted') {
            showAppMessage({
                message: 'Location',
                description: result === 'blocked'
                    ? 'Location access is blocked. Allow it in settings'
                    : 'Location access is required to get your position',
                type: 'warning',
            });

            if (result === 'blocked') {
                Linking.openSettings();
            }
            return;
        }

        Geolocation.getCurrentPosition(
            ({ coords }) => setPosition({ latitude: coords.latitude, longitude: coords.longitude }),
            (error) => showAppMessage({
                message: 'Location',
                description: error.code === 3
                    ? 'Timed out waiting for a location fix — on an emulator, set a location in its location controls'
                    : 'Failed to get your position',
                type: 'warning',
            }),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                {!isConnected && (
                    <View style={styles.banner}>
                        <Text style={styles.bannerText}>No connection</Text>
                    </View>
                )}
                <Text style={styles.title}>Dashboard</Text>
                <Pressable style={styles.button} onPress={handleOpenProfile}>
                    <Text style={styles.buttonText}>Open profile</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleOpenScanner}>
                    <Text style={styles.buttonText}>Scan</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleGetPosition}>
                    <Text style={styles.buttonText}>My location</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleOpenWebView}>
                    <Text style={styles.buttonText}>Open website</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleOpenCourseDetails}>
                    <Text style={styles.buttonText}>Course details</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleOpenCourses}>
                    <Text style={styles.buttonText}>Courses (thunk vs saga)</Text>
                </Pressable>
                {position && (
                    <Text style={styles.subtitle}>
                        {position.latitude}, {position.longitude}
                    </Text>
                )}
            </ScrollView>
            <AppFlashMessage />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        paddingVertical: 32,
    },
    banner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#d64545',
    },
    bannerText: {
        color: '#fff',
        fontWeight: '600',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
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
