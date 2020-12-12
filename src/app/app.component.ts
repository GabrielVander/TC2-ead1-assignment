import {Component} from '@angular/core';
import {ShowService} from '../services/show/show.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showList = false;

  constructor(showService: ShowService) {
    showService.searched.subscribe(
      value => this.showList = value
    );
  }

}
