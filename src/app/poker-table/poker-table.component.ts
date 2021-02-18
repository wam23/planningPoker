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

  fibReihe = [
    {value: 1, text: '1', styleClass: 'btn-success'},
    {value: 2, text: '2', styleClass: 'btn-success'},
    {value: 3, text: '3', styleClass: 'btn-success'},
    {value: 5, text: '5', styleClass: 'btn-warning'},
    {value: 8, text: '8', styleClass: 'btn-warning'},
    {value: 13, text: '13', styleClass: 'btn-danger'},
    {value: 20, text: '20', styleClass: 'btn-danger'},
    {value: 0, text: '?', styleClass: 'btn-danger'}
  ];
  selectedVote;

  vote(vote): void {
    this.http.post(`https://planningpoker-server.azurewebsites.net/rooms/${this.room}/vote`, {
      name: this.name,
      vote
    }).pipe(
      catchError(_ => of('error!!!'))
    ).subscribe();

    const info = `${this.name} voted ${vote} in ${this.room}.`;
    console.log(info);
    this.selectedVote = vote;
  }

  cardDisabled(): string {
    return this.name && this.room ? null : 'disabled';
  }
}
