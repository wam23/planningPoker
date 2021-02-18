import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poker-result',
  templateUrl: './poker-result.component.html',
  styleUrls: ['./poker-result.component.css']
})
export class PokerResultComponent {

  @Input() room;

  cards;

  constructor(private http: HttpClient) {
  }

  reveal(): void {
    this.http.get(`https://planningpoker-server.azurewebsites.net/rooms/${this.room}/votes`)
      .subscribe(data => {
        this.cards = data;
      });
  }
}
