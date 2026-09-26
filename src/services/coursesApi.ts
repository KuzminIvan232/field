export type Course = {
    id: string;
    title: string;
};

let requestCounter = 0;

export async function getCourses(): Promise<Course[]> {
    const requestId = ++requestCounter;
    // Random delay on purpose: with no fixed latency, requests can resolve out of
    // order — exactly the race condition takeLatest exists to prevent.
    const delay = 300 + Math.random() * 1700;
    await new Promise<void>(resolve => setTimeout(() => resolve(), delay));

    return [
        { id: '1', title: `React Native Fundamentals (request #${requestId})` },
        { id: '2', title: `Redux Deep Dive (request #${requestId})` },
        { id: '3', title: `Firebase Push Notifications (request #${requestId})` },
    ];
}
