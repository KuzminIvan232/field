import { StyleSheet, Text, View } from 'react-native';

export default function PublicStack() {
    return (
        <View style={styles.container}>
            <Text>PublicStack</Text>
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
