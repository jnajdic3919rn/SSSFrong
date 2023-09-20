import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private httpClient: HttpClient) { }

  exchangeAuthCodeForAccessToken(code: string) {
    const tokenEndpoint = 'https://oauth2.googleapis.com/token';
    const body = new URLSearchParams();
    body.set('code', code);
    body.set('client_id',  environment.clientId);
    body.set('client_secret', environment.clientSecret)
    body.set('redirect_uri', environment.redirectUriApp);
    body.set('grant_type', 'authorization_code');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.httpClient.post(tokenEndpoint, body.toString(), { headers });
  }

  login(){
    const loginEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    let params = new HttpParams().set('scope', 'https%3A//www.googleapis.com/auth/drive.metadata.readonly');
    params.set('access_type',  'offline');
    params.set('include_granted_scopes', true);
    params.set('response_type', 'code');
    params.set('state', 'state_parameter_passthrough_value');
    params.set('redirect_uri', 'http://localhost:4200');
    params.set('client_id', environment.clientId);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Origin': '*'
    });

    return this.httpClient.get(loginEndpoint, { headers : headers, params : params});
  }

  exchangeForJwtToken(token: string): Observable<any> {
    const url = `${environment.authUrl}/google`;

    let body = {
      "accessToken": 'Bearer ' + token
    }
    return this.httpClient.post(url, body);
  }

  loginWithGoogle(): void{
    const clientId = environment.clientId;
    const redirectUri = environment.redirectUriApp;
    const existingScope = environment.existingScope;
    const additionalScope = environment.additionalScope;

    const scope = `${existingScope} ${additionalScope}`;

    const link = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${redirectUri}&client_id=${clientId}`
    window.location.href = link;
  }

  loginWithCredentials(username: string, password: string): Observable<any>{
    const url = `${environment.authUrl}/login`;

    let body = {
      "username": username,
      "password": password
    }
    return this.httpClient.post(url, body);

  }
}
