import type { ClassRoster } from './entities';

export interface RosterRepository {
  getRoster(): Promise<ClassRoster[]>;
}
