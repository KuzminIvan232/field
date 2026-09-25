export const ScreenNames = {
    Launch: 'Launch',
    PublicStack: 'PublicStack',
    PrivateStack: 'PrivateStack',
    Login: 'Login',
    Dashboard: 'Dashboard',
    Profile: 'Profile',
} as const;

export type ScreenName = typeof ScreenNames[keyof typeof ScreenNames];
