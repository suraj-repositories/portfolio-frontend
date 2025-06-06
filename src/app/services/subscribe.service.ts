import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  subscribeSave(email: string) {
    return this.http.post(`${this.apiUrl}/subscribe`, { email }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

}
