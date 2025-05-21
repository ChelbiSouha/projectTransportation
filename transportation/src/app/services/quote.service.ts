import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../models/quote.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private readonly baseUrl = `${environment.apiBaseUrl}/quote`;

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    console.error('QuoteService Error:', error);
    return throwError(() => new Error('Something went wrong; please try again.'));
  }

  getAllQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.baseUrl}/all`)
      .pipe(catchError(this.handleError));
  }

  getByShipment(shipmentId: number): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.baseUrl}/shipment/${shipmentId}`)
      .pipe(catchError(this.handleError));
  }

  getByTransporter(transporterId: number): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.baseUrl}/transporter/${transporterId}`)
      .pipe(catchError(this.handleError));
  }

  addQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(`${this.baseUrl}/add`, quote)
      .pipe(catchError(this.handleError));
  }

  updateQuote(id: number, quote: Quote): Observable<Quote> {
    return this.http.put<Quote>(`${this.baseUrl}/update/${id}`, quote)
      .pipe(catchError(this.handleError));
  }
}
