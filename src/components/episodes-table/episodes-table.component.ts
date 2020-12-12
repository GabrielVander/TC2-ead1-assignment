import {Component} from '@angular/core';
import {ShowService} from '../../services/show/show.service';
import Episode from '../../models/Episode';

@Component({
  selector: 'app-episodes-table',
  templateUrl: './episodes-table.component.html'
})
export class EpisodesTableComponent {

  episodes: Episode[] = [];
  loading = false;

  constructor(public showService: ShowService) {
    showService.loadingEpisodes.subscribe(value => this.loading = value);
    showService.getShowEpisodes().subscribe(value => {
      showService.updateLoadingEpisodes(false);
      this.episodes = value;
    });
  }

}
