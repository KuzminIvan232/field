import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

export type GradientTextProps = {
    children: React.ReactNode,
    style?: StyleProp<TextStyle>,
    colors: string[],
    start?: { x: number; y: number },
    end?: { x: number; y: number },
    locations?: number[],
}
