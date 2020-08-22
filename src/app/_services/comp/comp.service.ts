import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../config';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Comp } from "./comp";
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
export class CompService {
  compUrl = `${config.apiUrl}/comp`;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) { 
    this.handleError = httpErrorHandler.createHandleError('CompService')
   }

  /** GET Comps from the server */
  getComps (): Observable<Comp[]> {
    return this.http.get<Comp[]>(this.compUrl)
      .pipe(
        catchError(this.handleError('getComps', []))
      );
  }
}
