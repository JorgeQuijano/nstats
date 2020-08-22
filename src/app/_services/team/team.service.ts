import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../config';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Team } from "./team";
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
export class TeamService {
  
  apiURL = `${config.apiUrl}/team`;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) { 
    this.handleError = httpErrorHandler.createHandleError('TeamService')
  }

  /** GET Teams from the server */
  getTeams (): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiURL)
      .pipe(
        catchError(this.handleError('getTeams', []))
      );
  }

}
