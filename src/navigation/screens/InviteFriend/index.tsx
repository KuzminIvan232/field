import { useState } from 'react';
import { FlatList, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import AppFlashMessage from '@components/AppFlashMessage';
import { showAppMessage } from '@services/flashMessage';
import { ensurePermission } from '@services/permissions';

export default function InviteFriend() {
    const [contacts, setContacts] = useState<Contact[]>([]);

    const handleInvite = async () => {
        const result = await ensurePermission('contacts');

        if (result === 'granted') {
            try {
                const all = await Contacts.getAll();
                setContacts(all.slice(0, 5));

                if (all.length === 0) {
                    showAppMessage({
                        message: 'Contacts',
                        description: 'No contacts found on this device',
                        type: 'info',
                    });
                }
            } catch {
                showAppMessage({
                    message: 'Contacts',
                    description: 'Failed to load contacts',
                    type: 'danger',
                });
            }
            return;
        }

        showAppMessage({
            message: 'Contacts',
            description: result === 'blocked'
                ? 'Contacts access is blocked. Allow it in settings'
                : 'Contacts access is required to invite a friend',
            type: 'warning',
        });

        if (result === 'blocked') {
            Linking.openSettings();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Invite a friend</Text>
            <Pressable style={styles.button} onPress={handleInvite}>
                <Text style={styles.buttonText}>Invite a friend</Text>
            </Pressable>
            <FlatList
                style={styles.list}
                data={contacts}
                keyExtractor={item => item.recordID}
                renderItem={({ item }) => (
                    <Text style={styles.contactName}>{item.displayName ?? item.givenName}</Text>
                )}
            />
            <AppFlashMessage />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 80,
        gap: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#2f6fed',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    list: {
        width: '100%',
    },
    contactName: {
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 6,
    },
});
