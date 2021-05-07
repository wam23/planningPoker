import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from './poker-lobby/poker-lobby.component';
import {PokerTableComponent} from './poker-table/poker-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User;

  @ViewChild(PokerTableComponent) table: PokerTableComponent;

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

  resetSelections(): void {
    console.log('###RESET App');
    this.table.resetSelection();
  }
}
