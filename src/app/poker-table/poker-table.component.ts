import {Component, Input} from '@angular/core';

import {HttpClient} from '@angular/common/http';

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

  vote(vote): void {
    this.http.post(`https://planningpoker-server.azurewebsites.net/rooms/${this.room}/vote`, {
      name: this.name,
      vote
    }).subscribe();

    const info = `${this.name} voted ${vote} in ${this.room}.`;
    console.log(info);
    this.selectedVote = vote;
  }
}
