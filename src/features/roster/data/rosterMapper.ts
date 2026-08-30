import type { ClassRoster, Member } from '../domain/entities';

export type ContactDto = {
  name?: string;
  image?: string;
  contactId?: number;
  contactType?: string;
};

export type ClassRosterDto = {
  classRosterAttendeeID?: number;
  classRosterID?: number;
  classRosterName?: string;
  classStartTime?: string;
  classEndTime?: string;
  registeredContacts?: ContactDto[];
};

export type RosterResponseDto = {
  result?: ClassRosterDto[];
  hasErrors?: boolean;
  error?: string | null;
};

const PLACEHOLDER_IMAGE = 'icon-user-reverse.png';

function toClockTime(value?: string) {
  const parts = (value ?? '').split(' ');
  if (parts.length < 3) {
    return '';
  }
  return `${parts[1].replace(/^0/, '')} ${parts[2]}`;
}

function toMember(dto: ContactDto, index: number): Member {
  const image = dto.image ?? '';
  const hasPhoto = image.length > 0 && !image.endsWith(PLACEHOLDER_IMAGE);

  return {
    id: String(dto.contactId ?? index),
    name: dto.name?.trim() || 'Unknown',
    photo: hasPhoto ? image : null,
    type: dto.contactType ?? '',
  };
}

export function toClassRoster(dto: ClassRosterDto, index: number): ClassRoster {
  const start = toClockTime(dto.classStartTime);
  const end = toClockTime(dto.classEndTime);

  return {
    id: String(dto.classRosterAttendeeID ?? dto.classRosterID ?? index),
    name: dto.classRosterName?.trim() || 'Class',
    time: start && end ? `${start} - ${end}` : start || end,
    members: (dto.registeredContacts ?? []).map(toMember),
  };
}
