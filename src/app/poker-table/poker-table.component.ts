import {Component, Input, OnInit} from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.css']
})
export class PokerTableComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  @Input() name;
  @Input() room;

  testVar;

  ngOnInit(): void {
  }

  vote(vote): void {
    console.log(`${this.name} voted ${vote} in ${this.room}.`);
    // this.testVar = this.http.get('https://planningpoker-server.azurewebsites.net/rooms/ATM/votes');
    this.testVar = this.http.post(`https://planningpoker-server.azurewebsites.net/rooms/${this.room}/vote`, {
      name: this.name,
      vote
    });
  }
}
