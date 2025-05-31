import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Review } from '../models/review.model';
import { ReviewRequest } from '../models/review-request.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly apiUrl = `${environment.apiBaseUrl}/review`;

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    console.error('ReviewService Error:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  addReview(reviewRequest: ReviewRequest): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/add`, reviewRequest)
      .pipe(catchError(this.handleError));
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/all`)
      .pipe(catchError(this.handleError));
  }

  getReviewsByTransporter(transporterId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/transporter/${transporterId}`)
      .pipe(catchError(this.handleError));
  }

  getReviewsByUser(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/user/${userId}`)
      .pipe(catchError(this.handleError));
  }

  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${reviewId}`)
      .pipe(catchError(this.handleError));
  }
}
