import { ScrollView, StyleSheet, Text, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

type CourseDetailsProps = {
    courseId?: string;
};

const COURSE_DESCRIPTION_HTML = `
    <p><b>React Native Fundamentals</b> is a hands-on course covering navigation, native modules, and platform-specific APIs.</p>
    <p>What you'll learn:</p>
    <ul>
        <li>Setting up permissions on iOS and Android</li>
        <li>Working with the camera, geolocation, and contacts</li>
        <li>Bridging native device APIs from JavaScript</li>
    </ul>
    <p>Read more on the <a href="https://reactnative.dev">official React Native website</a>.</p>
`;

export default function CourseDetails({ courseId }: CourseDetailsProps) {
    const { width } = useWindowDimensions();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {courseId && <Text style={styles.pushBadge}>Opened from a push notification — course #{courseId}</Text>}
            <RenderHtml contentWidth={width} source={{ html: COURSE_DESCRIPTION_HTML }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    pushBadge: {
        fontSize: 13,
        color: '#2f6fed',
        fontWeight: '600',
        marginBottom: 12,
    },
});
