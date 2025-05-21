// src/app/models/transporter.model.ts

import { User } from './user.model';

export interface Transporter {
  id: number;
  user: User;
  phone: string;
  vehicleType: string;
  available: boolean;
  licenseImage: string; // base64
  vehicleRegistrationImage: string; // base64
  plateNumber: string;
  approved: boolean;
}
