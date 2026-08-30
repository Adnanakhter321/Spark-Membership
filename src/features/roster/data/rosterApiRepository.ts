import { api } from '@/api/client';

import type { RosterRepository } from '../domain/rosterRepository';
import { toClassRoster, type RosterResponseDto } from './rosterMapper';

const ROSTER_URL = '/contacts';

export const rosterApiRepository: RosterRepository = {
  async getRoster() {
    const { data } = await api.get<RosterResponseDto>(ROSTER_URL);

    if (data.hasErrors) {
      throw new Error(data.error ?? 'The roster could not be loaded.');
    }

    return (data.result ?? []).map(toClassRoster);
  },
};
