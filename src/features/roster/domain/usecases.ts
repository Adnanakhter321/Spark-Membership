import type { ClassRoster } from './entities';
import type { RosterRepository } from './rosterRepository';

export async function getActiveClasses(repository: RosterRepository): Promise<ClassRoster[]> {
  const classes = await repository.getRoster();
  return classes.filter(item => item.members.length > 0);
}

export function searchRoster(classes: ClassRoster[], query: string): ClassRoster[] {
  const text = query.trim().toLowerCase();

  if (text === '') {
    return classes;
  }

  return classes
    .map(item => {
      if (item.name.toLowerCase().includes(text)) {
        return item;
      }

      return {
        ...item,
        members: item.members.filter(
          member => member.name.toLowerCase().includes(text) || member.id.includes(text),
        ),
      };
    })
    .filter(item => item.members.length > 0);
}

export function countMembers(classes: ClassRoster[]): number {
  return classes.reduce((total, item) => total + item.members.length, 0);
}
