import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';

import { catchError, switchMap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';

export interface Fact {
  id: string;
  fact: string;
  source: string;
  approved: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

@Injectable({ providedIn: 'root' })
export class FactService {
  constructor(private http: HttpClient, public auth: AuthService) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else if (error.status === 401) {
      // TODO: show unatuhorized alert to user
    } else {
      console.error(
        `Api returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(
      () => new Error(`Error, please try again later: ${error.message}`)
    );
  }

  public getAllFacts(): Observable<Fact[]> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap((accessToken: string) =>
        this.http
          .get<Fact[]>(`${environment.internalApiEndpoint}/facts/all`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          .pipe(catchError(this.handleError))
      )
    );
  }
}
