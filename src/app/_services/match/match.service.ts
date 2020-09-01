import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../config';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Match, MatchRaw, MatchActionCount, OneColMatch } from "./match";
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  APIURL = `${config.apiUrl}/match`;  
  matchRawURL = `${config.apiUrl}/match/raw`;  
  matchActionCountURL = `${config.apiUrl}/match/actions`;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) { 
    this.handleError = httpErrorHandler.createHandleError('MatchService')
   }

  getMatches (): Observable<Match[]> {
    return this.http.get<Match[]>(this.APIURL)
      .pipe(
        catchError(this.handleError('getMatches', []))
      );
  }

  getMatch (): Observable<Match[]> {
    return this.http.get<Match[]>(this.APIURL)
      .pipe(
        catchError(this.handleError('getMatches', []))
      );
  }

  getMatchRaw (matchid: number): Observable<MatchRaw[]> {
    return this.http.get<MatchRaw[]>(this.matchRawURL+`/${matchid}`)
      .pipe(
        catchError(this.handleError('getMatchRaw', []))
      );
  }

  getMatchRawL7 (): Observable<MatchRaw[]> {
    return this.http.get<MatchRaw[]>(this.matchRawURL+`/days`)
      .pipe(
        catchError(this.handleError('getLXMatchRaw', []))
      );
  }

  getMatchActionCount (matchid: number): Observable<MatchActionCount[]> {
    return this.http.get<MatchActionCount[]>(this.matchActionCountURL+`/${matchid}`)
      .pipe(
        catchError(this.handleError('getMatchActionCount', []))
      );
  }
  

  getMatchesRaw (): Observable<MatchRaw[]> {
    return this.http.get<MatchRaw[]>(this.matchRawURL)
      .pipe(
        catchError(this.handleError('getMatches', []))
      );
  }

  getSincleColumnMatches (teamid: number, limit: number): Observable<OneColMatch[]> {
    return this.http.get<OneColMatch[]>(this.APIURL+`/singlecol/${teamid}/${limit}`)
      .pipe(
        catchError(this.handleError('getSincleColumnMatches', []))
      );
  }
}
