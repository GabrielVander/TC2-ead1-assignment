import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {catchError} from 'rxjs/operators';
import Show from '../../models/Show';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  private showAPI = 'http://api.tvmaze.com';  // URL to web api
  private searchShowEndpoint = '/search/shows?q=';
  private $shows: Show[] = [];

  constructor(private http: HttpClient, private notification: NzNotificationService) {
  }

  get shows(): Show[] {
    return this.$shows;
  }

  set shows(value: Show[]) {
    this.$shows = value;
  }

  searchShow(query: string): void {
    this.http
      .get<Show[]>(`${this.showAPI}${this.searchShowEndpoint}${query}`)
      .pipe(catchError(this.handleError<Show[]>('searchShow', [])))
      .subscribe(result => {
        this.shows = result;
        console.log(this.shows);
      });
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
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
