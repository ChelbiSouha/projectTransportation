import { User } from './user.model';
import { Transporter } from './transporter.model';

export interface Shipment {
  id?: number;
  title: string;
  description: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: string;  // Optionnellement: 'pending' | 'confirmed' | 'completed' | 'cancelled' ...
  receiverPhone: string;
  weight: number;
  type: string;
  proposedPrice?: number;
  distance?: number;
  images?: string[];
  user: User;
  confirmedTransporter?: Transporter;
  createdAt?: string; // ISO string, ou Date si tu préfères
  updatedAt?: string;
}
