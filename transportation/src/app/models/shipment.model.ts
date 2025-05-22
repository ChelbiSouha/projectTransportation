import { User } from './user.model';
import { Transporter } from './transporter.model';

export interface Shipment {
  id?: number;
  title: string;
  description: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: string;
  receiverPhone: string;
  weight: number;
  type: string;
  proposedPrice: number;
  createdAt?: string;
  updatedAt?: string;
  images?: string[];
  user: User;
  confirmedTransporter?: Transporter;
  distance?: number;
}
