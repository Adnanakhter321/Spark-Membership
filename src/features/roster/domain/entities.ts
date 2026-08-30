export type Member = {
  id: string;
  name: string;
  photo: string | null;
  type: string;
};

export type ClassRoster = {
  id: string;
  name: string;
  time: string;
  members: Member[];
};
