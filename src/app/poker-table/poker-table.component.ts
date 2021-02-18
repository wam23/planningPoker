import {Component, Input} from '@angular/core';

import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';

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
  status;

  vote(vote): void {
    this.status = 'wird gespeichert';
    this.http.post(`https://planningpoker-server.azurewebsites.net/rooms/${this.room}/vote`, {
      name: this.name,
      vote
    }).subscribe((res: HttpResponse<object>) => {
      this.status = "gespeichert";
    }, (error: HttpErrorResponse) => {
      this.status = `Fehler ${error.status} ${error.statusText}`;
    });

    console.log(`${this.name} voted ${vote} in ${this.room}.`);
    this.selectedVote = vote;
  }

  cardDisabled(): string {
    return this.name && this.room ? null : 'disabled';
  }
}
