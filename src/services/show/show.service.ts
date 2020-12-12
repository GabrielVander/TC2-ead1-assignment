import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {catchError} from 'rxjs/operators';
import Show from '../../models/Show';
import Episode from '../../models/Episode';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  private baseAPI = 'http://api.tvmaze.com';  // URL to web api
  private searchShowEndpoint = '/search/shows';
  private showEndpoint = '/shows';
  private $shows: BehaviorSubject<Show[]> = new BehaviorSubject<Show[]>([]);
  private $searched: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $loadingEpisodes: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $showEpisodesModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $showId: number | null;

  constructor(private http: HttpClient, private notification: NzNotificationService) {
  }

  get shows(): Subject<Show[]> {
    return this.$shows;
  }

  get loading(): Subject<boolean> {
    return this.$loading;
  }

  get searched(): Subject<boolean> {
    return this.$searched;
  }

  get showEpisodesModal(): BehaviorSubject<boolean> {
    return this.$showEpisodesModal;
  }

  get showId(): number {
    return this.$showId;
  }

  get loadingEpisodes(): BehaviorSubject<boolean> {
    return this.$loadingEpisodes;
  }

  toggleEpisodesModal(value: boolean, showId?: number): void {
    this.$showId = showId || null;
    this.$showEpisodesModal.next(value);
  }

  searchShow(query: string): void {
    this.updateSearched(query.length !== 0);
    this.updateLoading(true);
    this.http
      .get<Show[]>(`${this.baseAPI}${this.searchShowEndpoint}?q=${query}`)
      .pipe(catchError(this.handleError<Show[]>('searchShow', [])))
      .subscribe(result => {
        this.updateLoading(false);
        this.$shows.next(result);
      });
  }

  getShowEpisodes(): Observable<Episode[]> {
    this.updateLoadingEpisodes(true);
    return this.http
      .get<Episode[]>(`${this.baseAPI}${this.showEndpoint}/${this.$showId}/episodes`)
      .pipe(catchError(this.handleError<Episode[]>('getEpisodes', [])));
  }

  updateLoadingEpisodes(value: boolean): void {
    this.loadingEpisodes.next(value);
  }

  private updateSearched(value: boolean): void {
    this.$searched.next(value);
  }

  private updateLoading(value: boolean): void {
    this.loading.next(value);
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);
      this.notifyError(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private notifyError(message: string): void {
    this.notification.create(
      'error',
      'Error',
      message,
      {
        nzDuration: 0
      });
  }

}
