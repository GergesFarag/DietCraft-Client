import { UserInfoSchema } from "./UserInfoSchema";

export interface IUser {
  username?: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  isActive?: boolean;
  refreshToken?: string;
  userData?: UserInfoSchema;
  profileImage?:string;
}
