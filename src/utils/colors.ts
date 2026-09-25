
export const lightColors = {
    background: 'rgb(245, 227, 198)',
    section: 'rgb(220, 203, 175)',
    border: 'rgb(196, 173, 140)',
    primary: 'rgb(52, 42, 25)',
    muted: 'rgba(52, 42, 25, 0.6)',
    screenGradientEnd: 'rgb(224, 206, 178)',
    profileGradientEnd: 'rgb(175, 144, 107)',
    cardGradientEnd: 'rgb(177, 141, 89)',
    buttonPressed: 'rgb(208, 178, 137)',
    accent: 'rgb(195, 90, 37)',
};

export const darkColors: typeof lightColors = {
    background: 'rgb(28, 22, 15)',
    section: 'rgb(69, 55, 37)',
    border: 'rgb(120, 100, 72)',
    primary: 'rgb(240, 227, 210)',
    muted: 'rgba(240, 227, 210, 0.6)',
    screenGradientEnd: 'rgb(38, 30, 20)',
    profileGradientEnd: 'rgb(70, 55, 38)',
    cardGradientEnd: 'rgb(66, 50, 32)',
    buttonPressed: 'rgb(58, 46, 30)',
    accent: 'rgb(224, 122, 63)',
};

export type Colors = typeof lightColors;
