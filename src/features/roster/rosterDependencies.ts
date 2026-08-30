import { rosterApiRepository } from './data/rosterApiRepository';
import type { RosterRepository } from './domain/rosterRepository';

export const rosterRepository: RosterRepository = rosterApiRepository;
