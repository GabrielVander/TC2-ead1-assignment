import { Component } from '@angular/core';
import {ShowService} from '../../services/show/show.service';
import Show from '../../models/Show';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html'
})
export class ShowListComponent {
  loading = false;
  shows: Show[];

  constructor(showService: ShowService) {
    showService.loading.subscribe(value => this.loading = value);
    showService.shows.subscribe(value => this.shows = value);
  }
}
