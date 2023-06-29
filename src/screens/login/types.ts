export interface Request {
  email: string;
  password: string;
}

export interface Parameter {
  [key: string]: string;
}

export interface Error {
  name?: string;
  status?: string;
  message?: string;
  stack?: string;
  code?: string;
}
export interface LoginResponseType {
  access_token: string;
}
