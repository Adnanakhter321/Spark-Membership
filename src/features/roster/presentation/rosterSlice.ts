import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { toApiError, type ApiError } from '@/api/errors';

import type { ClassRoster } from '../domain/entities';
import { getActiveClasses } from '../domain/usecases';
import { rosterRepository } from '../rosterDependencies';

type RosterState = {
  classes: ClassRoster[];
  query: string;
  loading: boolean;
  refreshing: boolean;
  error: ApiError | null;
};

const initialState: RosterState = {
  classes: [],
  query: '',
  loading: false,
  refreshing: false,
  error: null,
};

export const loadRoster = createAsyncThunk(
  'roster/load',
  async (_, { rejectWithValue }) => {
    try {
      return await getActiveClasses(rosterRepository);
    } catch (error) {
      return rejectWithValue(toApiError(error));
    }
  },
);

const rosterSlice = createSlice({
  name: 'roster',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadRoster.pending, state => {
        const showSpinner = state.classes.length === 0 || state.error !== null;

        state.loading = showSpinner;
        state.refreshing = !showSpinner;
        state.error = null;
      })
      .addCase(loadRoster.fulfilled, (state, action) => {
        state.classes = action.payload;
        state.loading = false;
        state.refreshing = false;
      })
      .addCase(loadRoster.rejected, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.error = (action.payload as ApiError) ?? {
          message: 'Something went wrong. Please try again.',
          canRetry: true,
        };
      });
  },
});

export const { setQuery } = rosterSlice.actions;
export const rosterReducer = rosterSlice.reducer;
