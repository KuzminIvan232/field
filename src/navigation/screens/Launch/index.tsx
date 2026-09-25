import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSession } from '@hooks/useSession';

export default function Launch() {
    useSession();

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
