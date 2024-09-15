import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './gridjs-sortable.directive';
import { Offre } from 'src/app/Models/offre';
import { OffreService } from 'src/app/core/services/offre.service';

interface SearchResult {

  offres: Offre[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}


const compare = (v1: string | number | undefined, v2: string | number | undefined) => 
  (v1 ?? '' < (v2 ?? '') ? -1 : v1 ?? '' > (v2 ?? '') ? 1 : 0);


function sort(offres: Offre[], column: SortColumn, direction: string): Offre[] {
  if (direction === '' || column === '') {
    return offres;
  } else {
    return [...offres].sort((a, b) => {
      const res = compare(a[column as keyof Offre] as string | number | undefined, b[column as keyof Offre] as string | number | undefined);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(offre: Offre, term: string, pipe: PipeTransform): boolean {
  return (
    (offre.title?.toLowerCase() ?? '').includes(term.toLowerCase()) ||
    (offre.company?.toLowerCase() ?? '').includes(term.toLowerCase()) ||
    (offre.location?.toLowerCase() ?? '').includes(term.toLowerCase()) ||
    (offre.keywords?.toLowerCase() ?? '').includes(term.toLowerCase()) ||
    (offre.description?.toLowerCase() ?? '').includes(term.toLowerCase())||
    (offre.location?.toLowerCase() ?? '').includes(term.toLowerCase())||
    (offre.createdAt?.toLowerCase() ?? '').includes(term.toLowerCase())
    
  );
}


@Injectable({ providedIn: 'root' })
export class GridJsService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _offres$ = new BehaviorSubject<Offre[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    startIndex: 0,
    endIndex: 9,
    totalRecords: 0
  };

  constructor(private pipe: DecimalPipe,private offreService:OffreService) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe(result => {
        this._offres$.next(result.offres);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get offres$() {
    return this._offres$.asObservable();
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
  get startIndex() {
    return this._state.startIndex;
  }
  get endIndex() {
    return this._state.endIndex;
  }
  get totalRecords() {
    return this._state.totalRecords;
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
  set startIndex(startIndex: number) {
    this._set({ startIndex });
  }
  set endIndex(endIndex: number) {
    this._set({ endIndex });
  }
  set totalRecords(totalRecords: number) {
    this._set({ totalRecords });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
  
    return this.offreService.getAllOffres().pipe(
      switchMap(offreList => {
        // 1. Filter first, because sorting on filtered results is better
        let offres = offreList.filter(offre => matches(offre, searchTerm, this.pipe));
  
        // 2. Sort the filtered results
        offres = sort(offres, sortColumn, sortDirection);
        const total = offres.length;
  
        // 3. Paginate after filtering and sorting
        const startIndex = (page - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, total);
        const paginatedOffres = offres.slice(startIndex, endIndex);
  
        // Set the state for pagination display
        this._state.totalRecords = total;
        this._state.startIndex = startIndex + 1;
        this._state.endIndex = endIndex;
  
        // Return the search result
        return of({ offres: paginatedOffres, total });
      })
    );
  }
  
  
}
function next(value: Offre[]): void {
  throw new Error('Function not implemented.');
}


