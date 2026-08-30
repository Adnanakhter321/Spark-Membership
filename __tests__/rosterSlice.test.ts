import type { ClassRoster } from '../src/features/roster/domain/entities';
import {
  loadRoster,
  rosterReducer,
  setQuery,
} from '../src/features/roster/presentation/rosterSlice';

const classes: ClassRoster[] = [
  {
    id: '1',
    name: 'Summer Camp',
    time: '7:00 AM - 11:00 AM',
    members: [{ id: '3777104', name: 'Santiago Mariah', photo: null, type: 'Active Member' }],
  },
];

const initialState = rosterReducer(undefined, { type: 'init' });

const pending = loadRoster.pending('request-1', undefined);
const fulfilled = loadRoster.fulfilled(classes, 'request-1', undefined);
const rejected = loadRoster.rejected(new Error('failed'), 'request-1', undefined, {
  message: 'Roster service is temporarily unavailable.',
  canRetry: true,
});

describe('roster slice', () => {
  it('starts empty', () => {
    expect(initialState).toEqual({
      classes: [],
      query: '',
      loading: false,
      refreshing: false,
      error: null,
    });
  });

  it('keeps the search text', () => {
    expect(rosterReducer(initialState, setQuery('mariah')).query).toBe('mariah');
  });

  it('shows the spinner on the first load', () => {
    const state = rosterReducer(initialState, pending);

    expect(state.loading).toBe(true);
    expect(state.refreshing).toBe(false);
  });

  it('refreshes quietly when the list is already on screen', () => {
    const loaded = rosterReducer(initialState, fulfilled);
    const state = rosterReducer(loaded, pending);

    expect(state.loading).toBe(false);
    expect(state.refreshing).toBe(true);
  });

  it('shows the spinner again when retrying after an error', () => {
    const loaded = rosterReducer(initialState, fulfilled);
    const failed = rosterReducer(loaded, rejected);
    const state = rosterReducer(failed, pending);

    expect(state.loading).toBe(true);
    expect(state.refreshing).toBe(false);
  });

  it('stores the classes it loaded', () => {
    const state = rosterReducer(initialState, fulfilled);

    expect(state.classes).toEqual(classes);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('keeps the message the API sent when the load fails', () => {
    const state = rosterReducer(initialState, rejected);

    expect(state.error?.message).toBe('Roster service is temporarily unavailable.');
    expect(state.error?.canRetry).toBe(true);
    expect(state.loading).toBe(false);
  });
});
