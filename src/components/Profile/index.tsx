
import {
    Text,
    View,
    Pressable,
    StyleSheet,
} from 'react-native';
import { useEffect, useMemo } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';

import LinearGradient from 'react-native-linear-gradient';
import { SvgProps } from 'react-native-svg';
import { makeStyles } from './styles';
import { ProfileProps } from './types';
import { useTheme } from '@hooks/useTheme';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import GradientText from '@components/GradientText';
import GraduationCap from '@icons/graduation-cap.svg';
import Clock4 from '@icons/clock-4.svg';
import Star from '@icons/star.svg';

const METRIC_ICONS: Record<string, React.FC<SvgProps>> = {
    'graduation-cap': GraduationCap,
    'clock-4': Clock4,
    star: Star,
};

function Profile({ name, subtitle, avatar, metrics, onPress, onLogout, userId }: ProfileProps) {
    const { colors } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);
    const { t } = useTranslation();

    // Entrance: avatar slides/fades in first, the name+subtitle block
    // follows 150ms later — both run on the UI thread via withTiming.
    const avatarProgress = useSharedValue(0);
    const textProgress = useSharedValue(0);
    const addCourseScale = useSharedValue(1);

    useEffect(() => {
        avatarProgress.value = withTiming(1, { duration: 300 });
        textProgress.value = withDelay(150, withTiming(1, { duration: 300 }));
    }, [avatarProgress, textProgress]);

    const avatarStyle = useAnimatedStyle(() => ({
        opacity: avatarProgress.value,
        transform: [{ translateY: (1 - avatarProgress.value) * 20 }],
    }));

    const textStyle = useAnimatedStyle(() => ({
        opacity: textProgress.value,
        transform: [{ translateY: (1 - textProgress.value) * 20 }],
    }));

    const addCourseStyle = useAnimatedStyle(() => ({
        transform: [{ scale: addCourseScale.value }],
    }));

    return (
        <View style={styles.root}>
            <LinearGradient colors={[colors.background, colors.profileGradientEnd]} style={StyleSheet.absoluteFill} />
            <View style={styles.firstSection}>
                <Animated.Image
                    source={{ uri: avatar }}
                    style={[styles.image, avatarStyle]}
                />
                <Animated.View style={[styles.textGroup, textStyle]}>
                    <GradientText style={styles.name} colors={[colors.primary, colors.accent]}>
                        {name}
                    </GradientText>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </Animated.View>
            </View>
            <View style={styles.metrics}>
                {metrics.map((item) => {
                    const Icon = METRIC_ICONS[item.icon];

                    return (
                        <View key={item.label} style={styles.metricItem}>
                            {Icon && <Icon width={20} height={20} stroke={colors.primary} />}
                            <Text style={styles.metricLabel}>{item.label}</Text>
                            <Text style={styles.metricValue}>{item.value}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={styles.thirdSection}>
                <Text style={styles.userId}>User Id: {userId}</Text>
                <View style={styles.buttons}>
                    <Animated.View style={[styles.cardShadow, addCourseStyle]}>
                        <View style={styles.card}>
                            <LinearGradient
                                colors={[colors.background, colors.cardGradientEnd]}
                                style={StyleSheet.absoluteFill}
                                locations={[0.3, 1]}
                            />
                            <Pressable
                                onPress={onPress}
                                onPressIn={() => { addCourseScale.value = withSpring(0.92); }}
                                onPressOut={() => { addCourseScale.value = withSpring(1); }}
                                style={({ pressed }) => [
                                    styles.button,
                                    pressed && styles.buttonPressed
                                ]}
                            >
                                <Text style={styles.addCourse}>Add course</Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                    <View style={styles.cardShadow}>
                        <View style={styles.card}>
                            <LinearGradient
                                colors={[colors.background, colors.cardGradientEnd]}
                                style={StyleSheet.absoluteFill}
                                locations={[0.3, 1]}
                            />
                            <Pressable onPress={onLogout} style={({ pressed }) => [
                                styles.button,
                                pressed && styles.buttonPressed
                            ]}>
                                <Text style={styles.addCourse}>{t('common.logout')}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default observer(Profile);
