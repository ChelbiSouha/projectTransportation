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

  // Upload un seul fichier et retourne HttpEvent pour tracking (progression)
  upload(files: File[]): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    if (files.length === 0) {
      throw new Error('No file provided');
    }

    formData.append('file', files[0], files[0].name);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  // Upload plusieurs fichiers et retourne les URL des fichiers
  uploadMultiple(files: File[]): Observable<string[]> {
    const formData: FormData = new FormData();
    if (files.length === 0) {
      throw new Error('No files provided');
    }

    for (const file of files) {
      formData.append('files', file, file.name);
    }

    return this.http.post<string[]>(`${this.baseUrl}/upload-multiple`, formData);
  }
}
