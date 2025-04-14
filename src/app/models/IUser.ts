import { UserInfoSchema } from './UserInfoSchema';

export interface IUser {
  username?: { type: string; required: true };
  email: { type: string; required: true };
  password: { type: string; required: true };
  isAdmin?: { type: boolean; default: false };
  isActive?: { type: boolean; default: false };
  refreshToken?: { type: string; default: '' };
  userData?: { type: UserInfoSchema; default: {} };
}
