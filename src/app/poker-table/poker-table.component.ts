import {Component, Input} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.css']
})
export class PokerTableComponent {

  constructor(private http: HttpClient) {
  }

  @Input() name;
  @Input() room;

  vote(vote): void {
    this.http.post(`https://planningpoker-server.azurewebsites.net/rooms/${this.room}/vote`, {
      name: this.name,
      vote
    }).pipe(
      catchError(_ => of('error!!!'))
    ).subscribe();

    const info = `${this.name} voted ${vote} in ${this.room}.`;
    console.log(info);
  }

  cardDisabled(): string {
    return this.name && this.room ? null : 'disabled';
  }
}
