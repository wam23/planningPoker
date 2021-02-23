import {Component, EventEmitter, Output} from '@angular/core';
import { NgForm } from '@angular/forms';

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

  save(form: NgForm): void {
    this.nameEmitter.emit(this.name);
    this.roomEmitter.emit(this.room);
  }
}
