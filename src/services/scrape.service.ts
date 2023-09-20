import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { ScrapeData } from 'src/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScrapeService {

  constructor(private httpClient: HttpClient) { }

  startScrape(faculty: string, url:string, survey: string, surveyType: string, surveyYear: number): Observable<any> {

    const authToken = localStorage.getItem("token");

    const params = new HttpParams()
      .append("faculty", faculty)
      .append("url", url)
      .append("survey", survey)
      .append("surveyType", surveyType)
      .append("surveyYear", surveyYear);

   
    let header = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    })
  
    
    return this.httpClient.get<any>(`${environment.scrapeUrl}`, { params:params, headers:header });
  }
}
