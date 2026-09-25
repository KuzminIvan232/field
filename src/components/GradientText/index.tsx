import MaskedViewImpl from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { Text, StyleProp, ViewStyle } from 'react-native';
import { GradientTextProps } from './types';

// @react-native-masked-view/masked-view's types predate React 19 and no longer
// satisfy React.Component's shape, so its class type is cast to a plain component type.
const MaskedView = MaskedViewImpl as unknown as React.ComponentType<{
    maskElement: React.ReactElement;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}>;

export default function GradientText({ children, style, colors, start, end, locations }: GradientTextProps) {
    return (
        <MaskedView maskElement={<Text style={style}>{children}</Text>}>
            <LinearGradient colors={colors} start={start} end={end} locations={locations}>
                <Text style={[style, { opacity: 0 }]}>{children}</Text>
            </LinearGradient>
        </MaskedView>
    )
}
