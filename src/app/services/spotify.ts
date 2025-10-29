import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Spotify {
  private clientId = environment.spotify.clientId;
  private clientSecret = environment.spotify.clientSecret;
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private apiUrl = 'https://api.spotify.com/v1/';
  private accessToken = '';

  constructor(private http: HttpClient) { }

  private getAccessToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
    });
    const body = new HttpParams().set('grant_type', 'client_credentials');
    return this.http.post(this.tokenUrl, body.toString(), { headers });
  }

  public searchTracks(query: string): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap((response: any) => {
        this.accessToken = response.access_token;
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.accessToken
        });
        const params = new HttpParams().set('q', query).set('type', 'track');
        return this.http.get(this.apiUrl + 'search', { headers, params });
      })
    );
  }
}
