import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Shipment } from '../models/shipment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private readonly baseUrl = `${environment.apiBaseUrl}/shipment`; // ✅ Correct base URL

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    console.error('ShipmentService Error:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  getAllShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.buildUrl('/all'))
      .pipe(catchError(this.handleError));
  }

  getShipmentById(id: number): Observable<Shipment> {
    return this.http.get<Shipment>(this.buildUrl(`/id/${id}`))
      .pipe(catchError(this.handleError));
  }

 addShipment(shipment: any): Observable<any> {
     return this.http.post<any>(`${this.baseUrl}/add`, shipment)
       .pipe(catchError(this.handleError));
   }

  updateShipment(id: number, shipment: Shipment): Observable<Shipment> {
    return this.http.put<Shipment>(this.buildUrl(`/update/${id}`), shipment)
      .pipe(catchError(this.handleError));
  }

  deleteShipment(id: number): Observable<void> {
    return this.http.delete<void>(this.buildUrl(`/delete/${id}`))
      .pipe(catchError(this.handleError));
  }

  getShipmentsByUserId(userId: number): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.buildUrl(`/user/${userId}`))
      .pipe(catchError(this.handleError));
  }

  searchShipments(location: string): Observable<Shipment[]> {
    const params = new HttpParams().set('location', location);
    return this.http.get<Shipment[]>(this.buildUrl('/search'), { params })
      .pipe(catchError(this.handleError));
  }
}
