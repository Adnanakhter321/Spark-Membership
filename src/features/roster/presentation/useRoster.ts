import { useCallback, useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { countMembers, searchRoster } from '../domain/usecases';
import { loadRoster, setQuery } from './rosterSlice';

export function useRoster() {
  const dispatch = useAppDispatch();
  const { classes, query, loading, refreshing, error } = useAppSelector(state => state.roster);

  useEffect(() => {
    dispatch(loadRoster());
  }, [dispatch]);

  const visibleClasses = useMemo(() => searchRoster(classes, query), [classes, query]);

  const memberCount = useMemo(() => countMembers(visibleClasses), [visibleClasses]);

  const onChangeQuery = useCallback(
    (text: string) => {
      dispatch(setQuery(text));
    },
    [dispatch],
  );

  const reload = useCallback(() => {
    dispatch(loadRoster());
  }, [dispatch]);

  return {
    classes: visibleClasses,
    query,
    loading,
    refreshing,
    error,
    memberCount,
    isEmpty: !loading && !error && classes.length === 0,
    hasNoMatches: classes.length > 0 && visibleClasses.length === 0,
    onChangeQuery,
    reload,
  };
}
