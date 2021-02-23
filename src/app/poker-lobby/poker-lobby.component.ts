import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

export interface User {
  name: string;
  room: string;
}

@Component({
  selector: 'app-poker-lobby',
  templateUrl: './poker-lobby.component.html',
  styleUrls: ['./poker-lobby.component.css']
})
export class PokerLobbyComponent {

  @Output() userEmitter: EventEmitter<User> = new EventEmitter();

  save(form: NgForm): void {
    const user = {name: form.value.name, room: form.value.room} as User;
    this.userEmitter.emit(user);
  }
}
