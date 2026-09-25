import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: '$accent',
        borderRadius: '1rem',
        paddingVertical: '0.25rem',
        paddingHorizontal: '0.75rem',
    },
    label: {
        color: '$background',
        fontSize: '0.8rem',
        fontFamily: 'Manrope-Bold',
    },
    '@media (min-width: 400)': {
        label: {
            fontSize: '0.9rem',
        },
    },
});
