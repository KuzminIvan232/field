export const ScreenNames = {
    Launch: 'Launch',
    Login: 'Login',
    Dashboard: 'Dashboard',
    Profile: 'Profile',
    Scanner: 'Scanner',
    InviteFriend: 'InviteFriend',
    DeviceInfo: 'DeviceInfo',
    WebView: 'WebView',
    CourseDetails: 'CourseDetails',
    Courses: 'Courses',
} as const;

export type ScreenName = typeof ScreenNames[keyof typeof ScreenNames];
