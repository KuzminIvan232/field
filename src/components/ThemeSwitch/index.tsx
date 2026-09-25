import { Pressable, View } from 'react-native';
import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { makeStyles } from './styles';
import { useTheme } from '@hooks/useTheme';
import { themeStore, ThemeMode } from '@store/theme/state';
import { setThemeMode } from '@store/theme/actions';
import { Colors } from '@utils/colors';

const OPTIONS: { mode: ThemeMode; label: string }[] = [
    { mode: 'light', label: 'light' },
    { mode: 'dark', label: 'Dark' },
    { mode: 'system', label: 'System' },
];

type ThemeOptionProps = {
    label: string;
    isActive: boolean;
    colors: Colors;
    styles: ReturnType<typeof makeStyles>;
    onPress: () => void;
};

function ThemeOption({ label, isActive, colors, styles, onPress }: ThemeOptionProps) {
    const progress = useSharedValue(isActive ? 1 : 0);

    useEffect(() => {
        progress.value = withTiming(isActive ? 1 : 0, { duration: 200 });
    }, [isActive, progress]);

    const fillStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(progress.value, [0, 1], ['transparent', colors.accent]),
    }));

    const labelStyle = useAnimatedStyle(() => ({
        color: interpolateColor(progress.value, [0, 1], [colors.muted, colors.background]),
    }));

    return (
        <Pressable style={styles.option} onPress={onPress}>
            <Animated.View style={[styles.optionFill, fillStyle]}>
                <Animated.Text style={[isActive ? styles.labelActive : styles.label, labelStyle]}>
                    {label}
                </Animated.Text>
            </Animated.View>
        </Pressable>
    );
}

function ThemeSwitch() {
    const { colors } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    return (
        <View style={styles.track}>
            {OPTIONS.map((option) => (
                <ThemeOption
                    key={option.mode}
                    label={option.label}
                    isActive={option.mode === themeStore.mode}
                    colors={colors}
                    styles={styles}
                    onPress={() => setThemeMode(option.mode)}
                />
            ))}
        </View>
    );
}

export default observer(ThemeSwitch);
