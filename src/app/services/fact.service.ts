import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';

import {
  catchError,
  debounceTime,
  delay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { SortColumn, SortDirection } from '../directives/sortable.directive';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
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

interface SearchResult {
  facts: Fact[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(facts: Fact[], column: SortColumn, direction: string): Fact[] {
  if (direction === '' || column === '') {
    return facts;
  } else {
    return [...facts].sort((a: Fact, b: Fact) => {
      const res = compare(a[column].toString(), b[column].toString());
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(fact: Fact, term: string) {
  return (
    fact.fact.toLowerCase().includes(term.toLowerCase()) ||
    fact.source.toLowerCase().includes(term.toLowerCase()) ||
    fact.createdBy.toLowerCase().includes(term.toLowerCase()) ||
    fact.updatedBy.toLowerCase().includes(term.toLowerCase()) ||
    fact.id.toLowerCase().includes(term.toLowerCase()) ||
    String(fact.approved).includes(term)
  );
}

@Injectable({ providedIn: 'root' })
export class FactService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _facts$ = new BehaviorSubject<Fact[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(private http: HttpClient, public auth: AuthService) {
    this.auth.getAccessTokenSilently().subscribe((accessToken: string) => {
      this.getAllFacts(accessToken).subscribe((allFacts: Fact[]) => {
        this._search$
          .pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search(allFacts)),
            delay(200),
            tap(() => this._loading$.next(false))
          )
          .subscribe((result) => {
            this._facts$.next(result.facts);
            this._total$.next(result.total);
          });

        this._search$.next();
      });
    });
  }

  get facts$() {
    return this._facts$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(unsortedFacts: Fact[]): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._state;

    // 1. sort
    let facts = sort(unsortedFacts, sortColumn, sortDirection);

    // 2. filter
    facts = facts.filter((fact) => matches(fact, searchTerm));
    const total = facts.length;

    // 3. paginate
    facts = facts.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ facts: facts, total });
  }

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

  public getAllFacts(accessToken: string): Observable<Fact[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http
      .get<Fact[]>(`${environment.internalApiEndpoint}/facts/all`, { headers })
      .pipe(catchError(this.handleError));
  }
}
