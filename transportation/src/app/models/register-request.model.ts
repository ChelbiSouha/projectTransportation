export enum Role {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  TRANSPORTER = 'TRANSPORTER'
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: Role;
}

