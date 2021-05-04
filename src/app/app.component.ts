import {Component, OnInit} from '@angular/core';
import {User} from './poker-lobby/poker-lobby.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User;

  receiveUser($event): void {
    this.user = $event;
    localStorage.setItem('poker', JSON.stringify(this.user));
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('poker'));
  }

  logout(): void {
    localStorage.removeItem('poker');
  }

}
