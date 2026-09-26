import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import coursesThunkReducer from './coursesThunkSlice';
import coursesSagaReducer from './coursesSagaSlice';
import { coursesSagaWatcher } from './coursesSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        coursesThunk: coursesThunkReducer,
        coursesSaga: coursesSagaReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(coursesSagaWatcher);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
