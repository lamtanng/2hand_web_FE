import { UserProps } from '../types/user.type';

export const formattedName = (user: UserProps | undefined) => {
  if (user?.firstName && user?.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }

  return 'Anonymous User';
};

export const normalizeString = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
