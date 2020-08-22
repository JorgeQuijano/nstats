import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../config';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Season } from "./season";
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
export class SeasonService {
  seasonUrl = `${config.apiUrl}/season`;
  private handleError: HandleError;


  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) { 
    this.handleError = httpErrorHandler.createHandleError('SeasonService')
   }

  /** GET Teams from the server */
  getSeasons (): Observable<Season[]> {
    return this.http.get<Season[]>(this.seasonUrl)
      .pipe(
        catchError(this.handleError('getSeasons', []))
      );
  }
}
