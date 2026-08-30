import type { ClassRoster } from '../src/features/roster/domain/entities';
import type { RosterRepository } from '../src/features/roster/domain/rosterRepository';
import {
  countMembers,
  getActiveClasses,
  searchRoster,
} from '../src/features/roster/domain/usecases';

const classes: ClassRoster[] = [
  {
    id: '1',
    name: 'Summer Camp',
    time: '7:00 AM - 11:00 AM',
    members: [
      { id: '3777104', name: 'Santiago Mariah', photo: null, type: 'Active Member' },
      { id: '4131125', name: 'Test Yellow', photo: null, type: 'Active Member' },
    ],
  },
  {
    id: '2',
    name: 'Yoga',
    time: '7:00 AM - 8:00 AM',
    members: [{ id: '6901907', name: 'Ruffalo Mark', photo: null, type: 'Fitness' }],
  },
  {
    id: '3',
    name: 'Nobody Signed Up',
    time: '2:00 PM - 3:00 PM',
    members: [],
  },
];

const fakeRepository: RosterRepository = {
  getRoster: () => Promise.resolve(classes),
};

describe('roster use cases', () => {
  it('hides classes that have no members', async () => {
    const result = await getActiveClasses(fakeRepository);

    expect(result.map(item => item.name)).toEqual(['Summer Camp', 'Yoga']);
  });

  it('finds a member by name, no matter the casing', () => {
    const result = searchRoster(classes, 'ruffalo');

    expect(result).toHaveLength(1);
    expect(result[0].members[0].name).toBe('Ruffalo Mark');
  });

  it('finds a member by id', () => {
    const result = searchRoster(classes, '4131125');

    expect(result[0].members).toHaveLength(1);
    expect(result[0].members[0].name).toBe('Test Yellow');
  });

  it('keeps the whole class when the class name matches', () => {
    const result = searchRoster(classes, 'yoga');

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Yoga');
    expect(result[0].members).toHaveLength(1);
  });

  it('returns nothing when the search matches no one', () => {
    expect(searchRoster(classes, 'nobody here')).toEqual([]);
  });

  it('gives back every class when the search is empty', () => {
    expect(searchRoster(classes, '   ')).toHaveLength(3);
  });

  it('counts the members of every class', () => {
    expect(countMembers(classes)).toBe(3);
  });
});
