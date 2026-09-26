import { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, Share, StyleSheet, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Clipboard from '@react-native-clipboard/clipboard';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppFlashMessage from '@components/AppFlashMessage';
import { showAppMessage } from '@services/flashMessage';
import { ScreenNames } from '@navigation/screenNames';

type ProfileProps = {
    componentId: string;
    userId: string;
};

export default function Profile({ componentId, userId }: ProfileProps) {
    const [clipboardText, setClipboardText] = useState<string | null>(null);
    const [birthDate, setBirthDate] = useState(new Date(2000, 0, 1));
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    useEffect(() => {
        Clipboard.getString().then(setClipboardText);
    }, []);

    const handleBack = () => {
        Navigation.pop(componentId);
    };

    const handleInviteFriend = () => {
        Navigation.push(componentId, {
            component: { name: ScreenNames.InviteFriend },
        });
    };

    const handleOpenDeviceInfo = () => {
        Navigation.push(componentId, {
            component: { name: ScreenNames.DeviceInfo },
        });
    };

    const handleShare = async () => {
        try {
            await Share.share({ message: 'Try Aurora — courses you actually finish' });
        } catch {
            showAppMessage({
                message: 'Share',
                description: 'Failed to open the share sheet',
                type: 'warning',
            });
        }
    };

    const handleBirthDateChange = (_event: unknown, selected?: Date) => {
        if (Platform.OS === 'android') {
            setIsDatePickerOpen(false);
        }
        if (selected) {
            setBirthDate(selected);
        }
    };

    const handleCopyUserId = () => {
        Clipboard.setString(userId);
        showAppMessage({
            message: 'Copied',
            description: 'userId copied to clipboard',
            type: 'success',
        });
    };

    const handleShowTabs = () => {
        Navigation.setRoot({
            root: {
                bottomTabs: {
                    children: [
                        {
                            stack: {
                                children: [{ component: { name: ScreenNames.Dashboard } }],
                                options: { bottomTab: { text: 'Dashboard' } },
                            },
                        },
                        {
                            stack: {
                                children: [
                                    {
                                        component: {
                                            name: ScreenNames.Profile,
                                            passProps: { userId },
                                        },
                                    },
                                ],
                                options: { bottomTab: { text: 'Profile' } },
                            },
                        },
                    ],
                },
            },
        });
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.subtitle}>userId: {userId}</Text>
                <Pressable style={styles.button} onPress={handleBack}>
                    <Text style={styles.buttonText}>Back</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleShowTabs}>
                    <Text style={styles.buttonText}>Switch to bottom tabs</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleInviteFriend}>
                    <Text style={styles.buttonText}>Invite a friend</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleOpenDeviceInfo}>
                    <Text style={styles.buttonText}>Device info</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleShare}>
                    <Text style={styles.buttonText}>Share</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleCopyUserId}>
                    <Text style={styles.buttonText}>Copy userId</Text>
                </Pressable>
                <Text style={styles.subtitle}>
                    Clipboard: {clipboardText === null ? 'loading…' : clipboardText || '(empty)'}
                </Text>

                <Text style={styles.title}>Birth date</Text>
                <Text style={styles.subtitle}>{birthDate.toLocaleDateString()}</Text>
                {Platform.OS === 'android' && (
                    <Pressable style={styles.button} onPress={() => setIsDatePickerOpen(true)}>
                        <Text style={styles.buttonText}>Pick birth date</Text>
                    </Pressable>
                )}
                {Platform.OS === 'android' && isDatePickerOpen && (
                    <DateTimePicker value={birthDate} mode="date" onChange={handleBirthDateChange} />
                )}
                {Platform.OS === 'ios' && (
                    <DateTimePicker
                        value={birthDate}
                        mode="date"
                        display="inline"
                        onChange={handleBirthDateChange}
                    />
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
