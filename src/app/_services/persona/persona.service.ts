import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../config';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Persona, PersonaRaw } from "./persona";
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
export class PersonaService {
  APIURL = `${config.apiUrl}/persona`;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('PersonaService')
    }

  getPersonas (): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.APIURL)
      .pipe(
        catchError(this.handleError('getPersonas', []))
      );
  };

  getPersona (personaid: number): Observable<PersonaRaw[]> {
    return this.http.get<PersonaRaw[]>(this.APIURL+`/${personaid}`)
      .pipe(
        catchError(this.handleError('getPersona', []))
      );
  };
  
}
