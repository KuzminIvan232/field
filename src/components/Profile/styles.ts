import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@utils/colors';

const AVATAR = 120;

export const makeStyles = (colors: Colors) => {
    return StyleSheet.create({
        root: {
            gap: 12,
            padding: 20,
            borderRadius: 16,
            overflow: 'hidden',
            backgroundColor: colors.background,
        },
        firstSection: {
            alignItems: 'center',
        },
        textGroup: {
            alignItems: 'center',
        },
        image: {
            width: AVATAR,
            height: AVATAR,
            borderRadius: AVATAR / 2,
        },
        name: {
            color: colors.primary,
            fontSize: 34,
            fontFamily: 'Manrope-Bold',
        },
        subtitle: {
            color: colors.muted,
            fontSize: 18,
            fontFamily: 'Manrope-Medium'
        },
        metrics: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
        },
        metricItem: {
            alignItems: 'center',
        },
        metricLabel: {
            fontFamily: 'Manrope-Regular',
            fontSize: 13,
            color: colors.muted
        },
        metricValue: {
            fontFamily: 'Manrope-Bold',
            fontSize: 20,
            color: colors.primary
        },
        thirdSection: {
            justifyContent: 'space-evenly',
            alignItems: 'center',
        },
        buttons: {
            flexDirection: 'row',
        },
        button: {
            padding: 12,
        },
        buttonPressed: {
            backgroundColor: colors.buttonPressed,
        },
        addCourse: {
            fontFamily: 'Manrope-Medium',
            fontSize: 16,
            color: colors.primary,
        },
        cardShadow: {
            borderRadius: 12,
            margin: 8,
            ...Platform.select({
                ios: {
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.25,
                    shadowRadius: 8,
                },
                android: {
                    elevation: 6,
                },
            })
        },
        card: {
            backgroundColor: colors.background,
            borderRadius: 12,
            overflow: 'hidden',
        },
        userId: {
            fontSize: 18,
            color: colors.muted
        }
    });
};
