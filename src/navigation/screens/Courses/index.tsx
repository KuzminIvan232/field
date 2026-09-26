import { Provider } from 'react-redux';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { store } from '@store/redux/store';
import { useAppDispatch, useAppSelector } from '@store/redux/hooks';
import { fetchCoursesThunk } from '@store/redux/coursesThunkSlice';
import { coursesRequested } from '@store/redux/coursesSagaSlice';

function CoursesList({ title, status, error, items, onRefresh }: {
    title: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    items: { id: string; title: string }[];
    onRefresh: () => void;
}) {
    return (
        <View style={styles.column}>
            <Text style={styles.title}>{title}</Text>
            <Pressable style={styles.button} onPress={onRefresh}>
                <Text style={styles.buttonText}>Refresh</Text>
            </Pressable>
            <Text style={styles.status}>Status: {status}</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <FlatList
                style={styles.list}
                data={items}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
            />
        </View>
    );
}

function CoursesScreen() {
    const dispatch = useAppDispatch();

    const thunkState = useAppSelector(state => state.coursesThunk);
    const sagaState = useAppSelector(state => state.coursesSaga);

    return (
        <View style={styles.container}>
            <Text style={styles.hint}>
                Tap "Refresh" three times fast on each side — thunk can show a stale
                request out of order, saga (takeLatest) never does.
            </Text>
            <View style={styles.row}>
                <CoursesList
                    title="Thunk"
                    status={thunkState.status}
                    error={thunkState.error}
                    items={thunkState.items}
                    onRefresh={() => dispatch(fetchCoursesThunk())}
                />
                <CoursesList
                    title="Saga"
                    status={sagaState.status}
                    error={sagaState.error}
                    items={sagaState.items}
                    onRefresh={() => dispatch(coursesRequested())}
                />
            </View>
        </View>
    );
}

export default function Courses() {
    return (
        <Provider store={store}>
            <CoursesScreen />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 12,
    },
    hint: {
        fontSize: 13,
        color: '#666',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        gap: 12,
    },
    column: {
        flex: 1,
        gap: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    status: {
        fontSize: 13,
        color: '#666',
    },
    error: {
        fontSize: 13,
        color: '#d64545',
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#2f6fed',
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    list: {
        flex: 1,
    },
    item: {
        fontSize: 12,
        paddingVertical: 6,
    },
});
