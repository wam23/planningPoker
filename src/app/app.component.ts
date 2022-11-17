import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from './poker-lobby/poker-lobby.component';
import {PokerTableComponent} from './poker-table/poker-table.component';
import {ThemeService} from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './animations.css']
})
export class AppComponent implements OnInit {
  user: User;

  @ViewChild(PokerTableComponent) table: PokerTableComponent;
  pyro = false;
  revealed= false;

  constructor(private theme:ThemeService) {}

  receiveUser($event): void {
    this.user = $event;
    localStorage.setItem('poker', JSON.stringify(this.user));
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('poker'));
    this.theme.loadTheme(this.user?.theme || 'gold');
  }

  logout(): void {
    localStorage.removeItem('poker');
    location.reload();
  }

  resetSelections(): void {
    this.table.resetSelection();
  }

  showPyro(result): void {
    this.pyro = result;
  }

  revealeCards($event):void {
    this.revealed = $event;
  }
}
