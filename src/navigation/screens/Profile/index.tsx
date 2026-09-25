import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ScreenNames } from '@navigation/screenNames';

type ProfileProps = {
    componentId: string;
    userId: string;
};

export default function Profile({ componentId, userId }: ProfileProps) {
    const handleBack = () => {
        Navigation.pop(componentId);
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
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>userId: {userId}</Text>
            <Pressable style={styles.button} onPress={handleBack}>
                <Text style={styles.buttonText}>Back</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handleShowTabs}>
                <Text style={styles.buttonText}>Switch to bottom tabs</Text>
            </Pressable>
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
