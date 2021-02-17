import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-poker-lobby',
  templateUrl: './poker-lobby.component.html',
  styleUrls: ['./poker-lobby.component.css']
})
export class PokerLobbyComponent {

  name;
  room;
  testVar;

  constructor(private http: HttpClient) {
  }

  executeTest(): void {
    console.log(`${this.name} joined ${this.room}.`);
    // this.testVar = this.http.get('https://planningpoker-server.azurewebsites.net/rooms/ATM/votes');
    this.testVar = this.http.post(`https://planningpoker-server.azurewebsites.net/rooms/${this.room}/vote`, {name: this.name, vote: '3'});
  }
}
