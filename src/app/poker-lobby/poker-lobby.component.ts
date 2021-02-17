import {Component, EventEmitter, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-poker-lobby',
  templateUrl: './poker-lobby.component.html',
  styleUrls: ['./poker-lobby.component.css']
})
export class PokerLobbyComponent {

  @Output() nameEmitter: EventEmitter<string> = new EventEmitter();
  @Output() roomEmitter: EventEmitter<string> = new EventEmitter();

  name;
  room;
  testVar;

  constructor(private http: HttpClient) {
  }

  emitName(): void {
    this.nameEmitter.emit(this.name);
  }

  emitRoom(): void {
    this.roomEmitter.emit(this.room);
  }

  executeTest(): void {
    console.log(`${this.name} joined ${this.room}.`);
    // this.testVar = this.http.get('https://planningpoker-server.azurewebsites.net/rooms/ATM/votes');
    this.testVar = this.http.post(`https://planningpoker-server.azurewebsites.net/rooms/${this.room}/vote`, {name: this.name, vote: '3'});
  }
}
