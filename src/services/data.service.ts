import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';
import { ResultsDto } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getTypes(): Observable<string[]> {
    const authToken = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    return this.httpClient.get<string[]>(`${environment.dataUrl}/survey/types`, {headers});
  }

  getSurveys(type: string, faculty: string): Observable<string[]> {
    const authToken = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    let params = new HttpParams().append("type",type).append("faculty", faculty);

    return this.httpClient.get<string[]>(`${environment.dataUrl}/survey`, {params, headers});
  }

  getSubjects(type: string, faculty: string, title: string): Observable<string[]> {
    const authToken = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    let params = new HttpParams().append("type",type).append("faculty", faculty).append("title", title);

    return this.httpClient.get<string[]>(`${environment.dataUrl}/subject`, {params, headers});
  }

  getResults(type: string, faculty: string, title: string, subject: string): Observable<ResultsDto>{
    const authToken = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    console.log(type)
      let body = {
        type: type,
        faculty: faculty,
        title: title,
        subject: subject
      }
    return this.httpClient.post<ResultsDto>(`${environment.resultsUrl}`, body, {headers});
  }
}
