import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import AppFlashMessage from '@components/AppFlashMessage';
import { ScreenNames } from '@navigation/screenNames';

type LoginProps = {
    componentId: string;
};

export default function Login({ componentId }: LoginProps) {
    const handleLogin = () => {
        Navigation.push(componentId, {
            component: {
                name: ScreenNames.Dashboard,
            },
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log in</Text>
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
