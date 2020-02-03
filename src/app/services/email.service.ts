import { Injectable } from '@angular/core';

import { Email } from '../models/Email';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient, private handler: HttpBackend) { 
    this.httpClient = new HttpClient(handler);
  }
  
  BASE_URL: string = 'http://localhost:8080';
  errorData: {};
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  envoyerEmail(formData: Email) {
    console.log(formData); 
    return this.httpClient.post<Email>(`${this.BASE_URL}/contact`, formData, this.httpOptions)
                          .pipe(
                            catchError(this.handleError)
                            );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong.

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message

    this.errorData = {
      errorTitle: 'Oups! Votre demande n\'a pas pu aboutir.',
      errorDesc: 'Une erreur s\'est produite. Merci de réessayer ultérieurement.'
    };
    return throwError(this.errorData);
  }

}
