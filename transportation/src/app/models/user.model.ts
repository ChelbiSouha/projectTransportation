import { Transporter } from './transporter.model';

export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  role: 'CLIENT' | 'TRANSPORTEUR' | 'ADMIN';
  transporter?: Transporter;
}
