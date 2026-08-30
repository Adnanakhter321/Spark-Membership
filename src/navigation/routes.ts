
export const Routes = {
  Roster: 'Roster',
} as const;

export type RouteName = (typeof Routes)[keyof typeof Routes];
