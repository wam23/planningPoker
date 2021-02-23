import {Component} from '@angular/core';
import {User} from './poker-lobby/poker-lobby.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;

  receiveUser($event): void {
    this.user = $event;
  }

}
