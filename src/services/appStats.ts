import AsyncStorage from '@react-native-async-storage/async-storage';

const LAUNCH_COUNT_KEY = 'app_launch_count';

export async function incrementLaunchCount(): Promise<number> {
    try {
        const raw = await AsyncStorage.getItem(LAUNCH_COUNT_KEY);
        const count = raw ? Number(raw) + 1 : 1;
        await AsyncStorage.setItem(LAUNCH_COUNT_KEY, count.toString());
        return count;
    } catch {
        return 1;
    }
}

export async function getLaunchCount(): Promise<number> {
    try {
        const raw = await AsyncStorage.getItem(LAUNCH_COUNT_KEY);
        return raw ? Number(raw) : 0;
    } catch {
        return 0;
    }
}