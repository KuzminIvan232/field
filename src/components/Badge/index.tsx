import { Text, View } from 'react-native';
import { styles } from './styles';
import { BadgeProps } from './types';

function Badge({ label }: BadgeProps) {
    return (
        <View style={styles.badge}>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
}

export default Badge;
