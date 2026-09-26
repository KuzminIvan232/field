import { call, put, takeLatest } from 'redux-saga/effects';
import { getCourses } from '@services/coursesApi';
import { coursesFailed, coursesLoaded, coursesRequested } from './coursesSagaSlice';

function* fetchCoursesSaga() {
    try {
        const courses: Awaited<ReturnType<typeof getCourses>> = yield call(getCourses);
        yield put(coursesLoaded(courses));
    } catch (error) {
        yield put(coursesFailed(error instanceof Error ? error.message : 'Unknown error'));
    }
}

export function* coursesSagaWatcher() {
    // takeLatest cancels the previous fetchCoursesSaga if it's still running
    // when a new coursesRequested comes in — the previous `put` never happens,
    // so an outdated response can never overwrite a newer one.
    yield takeLatest(coursesRequested.type, fetchCoursesSaga);
}
