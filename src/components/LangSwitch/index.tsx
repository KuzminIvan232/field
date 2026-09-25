import { Pressable, Text, View } from 'react-native';
import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles } from './styles';
import { useTheme } from '@hooks/useTheme';
import { localeStore, Lang } from '@store/locale/state';
import { setLang } from '@store/locale/actions';

const OPTIONS: { lang: Lang; label: string }[] = [
    { lang: 'en', label: 'English' },
    { lang: 'uk', label: 'Українська' },
];

function LangSwitch() {
    const { colors } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    return (
        <View style={styles.track}>
            {OPTIONS.map((option) => {
                const isActive = option.lang === localeStore.lang;

                return (
                    <Pressable
                        key={option.lang}
                        style={[styles.option, isActive && styles.optionActive]}
                        onPress={() => setLang(option.lang)}
                    >
                        <Text style={isActive ? styles.labelActive : styles.label}>
                            {option.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

export default observer(LangSwitch);
