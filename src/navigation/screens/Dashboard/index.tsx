import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ScreenNames } from '@navigation/screenNames';

type DashboardProps = {
    componentId: string;
};

export default function Dashboard({ componentId }: DashboardProps) {
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <Pressable style={styles.button} onPress={handleOpenProfile}>
                <Text style={styles.buttonText}>Open profile</Text>
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
