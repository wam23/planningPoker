import { DOCUMENT } from '@angular/common';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {User} from './poker-lobby/poker-lobby.component';
import {PokerTableComponent} from './poker-table/poker-table.component';

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

  constructor(@Inject(DOCUMENT) private document: Document) {}

  receiveUser($event): void {
    this.user = $event;
    localStorage.setItem('poker', JSON.stringify(this.user));
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('poker'));

    // todo load correct theme
    let themes = ['dark', 'gold', 'green', 'light', 'pink'];
    this.loadTheme(themes[Math.random() * themes.length>>0]);
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

  loadTheme(themeName: string) {
    const head = this.document.getElementsByTagName('head')[0];
    const themeSrc = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;

    if (themeSrc) {
      themeSrc.href = `assets/theme/${themeName}.css`;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `assets/theme/${themeName}.css`;

      head.appendChild(style);
    }
  }
}
