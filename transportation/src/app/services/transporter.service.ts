// src/app/services/transporter.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transporter } from '../models/transporter.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterTransporterRequest } from '../models/register-transporter-request.model';


@Injectable({
  providedIn: 'root'
})
export class TransporterService {
private baseUrl = `${environment.apiBaseUrl}/transporters`;

  constructor(private http: HttpClient) {}

  getAllTransporters(): Observable<Transporter[]> {
    return this.http.get<Transporter[]>(`${this.baseUrl}/all`);
  }

  updateTransporter(id: number, updatedTransporter: Transporter): Observable<Transporter> {
    return this.http.put<Transporter>(`${this.baseUrl}/update/${id}`, updatedTransporter);
  }
 getTransporterById(id: number): Observable<Transporter> {
   return this.http.get<Transporter>(`${this.baseUrl}/id/${id}`);
 }
 // Add a transporter
 addTransporter(transporter: Transporter): Observable<Transporter> {
   return this.http.post<Transporter>(`${this.baseUrl}/add`, transporter);
 }
registerTransporter(formData: FormData): Observable<any> {
  return this.http.post(`${environment.apiBaseUrl}/auth/register/transporter`, formData);
}


 // Delete a transporter by ID
 deleteTransporter(id: number): Observable<void> {
   return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
 }


}
