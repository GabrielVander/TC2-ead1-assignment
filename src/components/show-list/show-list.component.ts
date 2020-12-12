import {Component} from '@angular/core';
import {ShowService} from '../../services/show/show.service';
import Show from '../../models/Show';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html'
})
export class ShowListComponent {
  loading = false;
  shows: Show[];
  modalOpen: boolean;

  constructor(public showService: ShowService) {
    showService.loading.subscribe(value => this.loading = value);
    showService.shows.subscribe(value => this.shows = value);
    showService.showEpisodesModal.subscribe(value => this.modalOpen = value);
  }

  closeModal(): void {
    this.showService.toggleEpisodesModal(false);
  }

  openModal(id: number): void {
    this.showService.toggleEpisodesModal(true, id);
  }
}
