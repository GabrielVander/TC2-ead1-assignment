import { Component } from '@angular/core';
import {ShowService} from '../../services/show/show.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  public searchQuery: string | undefined;

  constructor(private showService: ShowService) {
  }

  searchShow(): void {
    this.showService.searchShow(this.searchQuery);
  }
}
