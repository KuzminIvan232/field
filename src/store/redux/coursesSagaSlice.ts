import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course } from '@services/coursesApi';

type CoursesSagaState = {
    items: Course[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: CoursesSagaState = {
    items: [],
    status: 'idle',
    error: null,
};

const coursesSagaSlice = createSlice({
    name: 'coursesSaga',
    initialState,
    reducers: {
        coursesRequested: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        coursesLoaded: (state, action: PayloadAction<Course[]>) => {
            state.status = 'succeeded';
            state.items = action.payload;
        },
        coursesFailed: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
});

export const { coursesRequested, coursesLoaded, coursesFailed } = coursesSagaSlice.actions;
export default coursesSagaSlice.reducer;
