import { StyleSheet } from 'react-native';
import { Colors } from '@utils/colors';

export const makeStyles = (colors: Colors) => {
    return StyleSheet.create({
        track: {
            flexDirection: 'row',
            backgroundColor: colors.section,
            borderRadius: 12,
            padding: 4,
            gap: 4,
        },
        option: {
            flex: 1,
        },
        optionFill: {
            paddingVertical: 10,
            alignItems: 'center',
            borderRadius: 9,
        },
        label: {
            fontFamily: 'Manrope-Medium',
            fontSize: 14,
        },
        labelActive: {
            fontFamily: 'Manrope-Bold',
            fontSize: 14,
        },
    });
};
