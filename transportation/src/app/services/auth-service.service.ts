import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        map(response => {
          // store JWT token and user info
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
          return response;
        }),
        catchError(err => {
          console.error('Login error', err);
          throw err;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  public getCurrentUserId(): number | null {
    const user = this.currentUserValue;
    return user && user.id ? user.id : null;
  }
  public getCurrentUser(): any {
    return this.currentUserValue;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('currentUser');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }
register(username: string, email: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/register`, { username, email, password })
    .pipe(
      map(response => {
        // Optionally, log the user in immediately after successful registration
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        return response;
      }),
      catchError(err => {
        console.error('Registration error', err);
        throw err;
      })
    );
}

}
