import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';

const MAP = {
    camera: Platform.select({ ios: PERMISSIONS.IOS.CAMERA, android: PERMISSIONS.ANDROID.CAMERA })!,
    location: Platform.select({ ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION })!,
    contacts: Platform.select({ ios: PERMISSIONS.IOS.CONTACTS, android: PERMISSIONS.ANDROID.READ_CONTACTS })!,
};

export type PermissionKind = keyof typeof MAP;

export type PermissionResult = 'granted' | 'denied' | 'blocked';

export async function ensurePermission(kind: PermissionKind): Promise<PermissionResult> {
    const permission = MAP[kind];
    const status = await check(permission);

    if (status === RESULTS.GRANTED) return 'granted';
    if (status === RESULTS.BLOCKED) return 'blocked';

    const result = await request(permission);

    if (result === RESULTS.GRANTED) return 'granted';
    if (result === RESULTS.BLOCKED) return 'blocked';

    return 'denied';
}
