import { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import WebView, { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';

const URL = 'https://reactnative.dev';

const INJECTED_JAVASCRIPT = `
    window.ReactNativeWebView.postMessage(document.title);
    true;
`;

export default function WebViewScreen() {
    const webViewRef = useRef<WebView<{}>>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [canGoBack, setCanGoBack] = useState(false);
    const [pageTitle, setPageTitle] = useState<string | null>(null);

    const handleNavigationStateChange = (navState: WebViewNavigation) => {
        setCanGoBack(navState.canGoBack);
    };

    const handleMessage = (event: WebViewMessageEvent) => {
        setPageTitle(event.nativeEvent.data);
    };

    const handleGoBack = () => {
        webViewRef.current?.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.toolbar}>
                <Pressable
                    style={[styles.button, !canGoBack && styles.buttonDisabled]}
                    disabled={!canGoBack}
                    onPress={handleGoBack}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </Pressable>
                {pageTitle && <Text style={styles.pageTitle}>{pageTitle}</Text>}
            </View>

            <WebView<{}>
                ref={webViewRef}
                source={{ uri: URL }}
                style={styles.webview}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                onNavigationStateChange={handleNavigationStateChange}
                injectedJavaScript={INJECTED_JAVASCRIPT}
                onMessage={handleMessage}
            />

            {isLoading && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
    },
    webview: {
        flex: 1,
    },
    loader: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#2f6fed',
        borderRadius: 8,
    },
    buttonDisabled: {
        backgroundColor: '#aac0f0',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    pageTitle: {
        flex: 1,
        fontSize: 14,
        color: '#666',
    },
});
