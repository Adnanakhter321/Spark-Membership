import { toClassRoster, type ClassRosterDto } from '../src/features/roster/data/rosterMapper';

const dto: ClassRosterDto = {
  classRosterAttendeeID: 7329522,
  classRosterID: 72876,
  classRosterName: '  Summer Camp  ',
  classStartTime: '7/7/2023 07:00 AM',
  classEndTime: '7/7/2023 11:00 AM',
  registeredContacts: [
    {
      name: ' Santiago Mariah ',
      image: 'https://app.sparkmembership.com/locationFiles/1882/profileImages/1882_3777104.jpg',
      contactId: 3777104,
      contactType: 'Active Member',
    },
    {
      name: 'Test Yellow',
      image: 'https://app.sparkmembership.com/img/icon-user-reverse.png',
      contactId: 4131125,
      contactType: 'Active Member',
    },
  ],
};

describe('roster mapper', () => {
  it('turns the API shape into the app shape', () => {
    const roster = toClassRoster(dto, 0);

    expect(roster.id).toBe('7329522');
    expect(roster.name).toBe('Summer Camp');
    expect(roster.members).toHaveLength(2);
  });

  it('reads the clock time out of the API date string', () => {
    expect(toClassRoster(dto, 0).time).toBe('7:00 AM - 11:00 AM');
  });

  it('leaves the time empty when the API sends no times', () => {
    expect(toClassRoster({ ...dto, classStartTime: undefined, classEndTime: undefined }, 0).time).toBe(
      '',
    );
  });

  it('keeps a real photo and drops the placeholder one', () => {
    const [santiago, yellow] = toClassRoster(dto, 0).members;

    expect(santiago.photo).toContain('1882_3777104.jpg');
    expect(santiago.name).toBe('Santiago Mariah');
    expect(yellow.photo).toBeNull();
  });

  it('falls back when a member has no name and no id', () => {
    const [member] = toClassRoster({ ...dto, registeredContacts: [{}] }, 0).members;

    expect(member.name).toBe('Unknown');
    expect(member.id).toBe('0');
    expect(member.photo).toBeNull();
  });

  it('falls back to the class id when there is no attendee id', () => {
    const roster = toClassRoster({ ...dto, classRosterAttendeeID: undefined }, 3);

    expect(roster.id).toBe('72876');
  });
});
