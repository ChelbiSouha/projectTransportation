import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseUrl = `${environment.apiBaseUrl}/files`;

  constructor(private http: HttpClient) { }

  upload(files: File[]): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    // You need to send ONE file per request (unless you change your backend)
    if (files.length > 0) {
      formData.append('file', files[0], files[0].name); // send one file at a time
    }

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

