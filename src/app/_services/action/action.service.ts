import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../config';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Action, ActionRaw, MatchActionsSummary, PersonaSummary } from "./action";
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
export class ActionService {
  APIURL = `${config.apiUrl}/action`;
  APIURLraw = `${config.apiUrl}/action/raw`;
  matchActionsURL = `${config.apiUrl}/action/raw/match/actions`;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) { 
    this.handleError = httpErrorHandler.createHandleError('ActionService')
   }

  getActions (): Observable<Action[]> {
    return this.http.get<Action[]>(this.APIURL)
      .pipe(
        catchError(this.handleError('getActions', []))
      );
  }

  getActionsRaw (): Observable<ActionRaw[]> {
    return this.http.get<ActionRaw[]>(this.APIURLraw)
      .pipe(
        catchError(this.handleError('getActionsRaw', []))
      );
  }

  getPersonaSummary (pid: number): Observable<PersonaSummary[]> {
    return this.http.get<PersonaSummary[]>(this.APIURL+`/summary/${pid}`)
      .pipe(
        catchError(this.handleError('getPersonaSummary', []))
      );
  }

  getMatchActions (mid: number): Observable<Action[]> {
    return this.http.get<Action[]>(this.APIURLraw+`/match/${mid}`)
      .pipe(
        catchError(this.handleError('getMatchActions', []))
      );
  }

  getMatchActionsSummaryt1 (mid: number): Observable<MatchActionsSummary[]> {
    return this.http.get<MatchActionsSummary[]>(this.matchActionsURL+`/${mid}/t1`)
      .pipe(
        catchError(this.handleError('getMatchActionsSummaryt1', []))
      );
  }

  getMatchActionsSummaryt2 (mid: number): Observable<MatchActionsSummary[]> {
    return this.http.get<MatchActionsSummary[]>(this.matchActionsURL+`/${mid}/t2`)
      .pipe(
        catchError(this.handleError('getMatchActionsSummaryt2', []))
      );
  }
}
