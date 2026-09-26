import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Course, getCourses } from '@services/coursesApi';

export const fetchCoursesThunk = createAsyncThunk('coursesThunk/fetch', () => getCourses());

type CoursesThunkState = {
    items: Course[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: CoursesThunkState = {
    items: [],
    status: 'idle',
    error: null,
};

const coursesThunkSlice = createSlice({
    name: 'coursesThunk',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoursesThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCoursesThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCoursesThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            });
    },
});

export default coursesThunkSlice.reducer;
