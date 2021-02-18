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
