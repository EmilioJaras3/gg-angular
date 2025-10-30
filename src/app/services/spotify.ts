import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Spotify {
  constructor(private http: HttpClient) { }

  public searchTracks(query: string): Observable<any> {
    const params = new HttpParams().set('q', query);
    const base = environment.apiUrl || '';
    const url = base + '/api/search';
    return this.http.get(url, { params });
  }
}
