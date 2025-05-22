import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AdmindashboardService {
private apiUrl = `${environment.apiBaseUrl}/admin-dashboard`;
   constructor(private http: HttpClient) {}

    getStats(): Observable<{ [key: string]: number }> {
      return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/stats`);
    }

    getShipmentsPerWeek(): Observable<{ [key: string]: number }> {
      return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/shipments-per-week`);
    }
  approveTransporter(userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/approve-transporter/${userId}`, {});
  }

rejectTransporter(userId: number) {
  return this.http.delete(`${this.apiUrl}/reject-transporter/${userId}`, { responseType: 'text' });
}
}
