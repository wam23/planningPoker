import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'planningPoker';

  name;
  room;

  recieveName($event): void {
    this.name = $event;
  }

  recieveRoom($event): void {
    this.room = $event;
  }

}
