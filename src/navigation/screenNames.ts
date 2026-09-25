export const ScreenNames = {
    Launch: 'Launch',
    PublicStack: 'PublicStack',
    PrivateStack: 'PrivateStack',
} as const;

export type ScreenName = typeof ScreenNames[keyof typeof ScreenNames];
