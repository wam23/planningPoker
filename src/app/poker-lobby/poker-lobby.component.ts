import {Component, EventEmitter, Output} from '@angular/core';

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

  emitName(): void {
    this.nameEmitter.emit(this.name);
  }

  emitRoom(): void {
    this.roomEmitter.emit(this.room);
  }
}
