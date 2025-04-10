export interface IAuthForm {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  name?: string;
  email: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}
export enum EnumTokens {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export type TypeUserForm = Omit<IUser, "id"> & { password?: string };
