import { StyleSheet, Text, View } from 'react-native';

export default function PrivateStack() {
    return (
        <View style={styles.container}>
            <Text>PrivateStack</Text>
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
