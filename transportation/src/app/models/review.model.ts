// review.model.ts
import { User } from './user.model';
import { Transporter } from './transporter.model';
import { Shipment } from './shipment.model';

export interface Review {
  id?: number;
  rating: number;
  comment: string;
  date?: string;
  user: User;
  transporter: Transporter;
  shipment?: Shipment;
}
