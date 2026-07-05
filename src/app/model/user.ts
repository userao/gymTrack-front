export interface IUser {
  login: string,
  password: string,
  email?: string,
}

export interface IUserSignupResponse extends IUser {
  id: string,
  role: Role
}

export interface IUserLoginResponse {
  id: number,
  access_token: string,
  role: Role
}

type Role = "USER" | "ADMIN"
