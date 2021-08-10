import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import cardsets from '../cardsets';

export interface User {
  name: string;
  room: string;
  cards: string;
}

@Component({
  selector: 'app-poker-lobby',
  templateUrl: './poker-lobby.component.html',
  styleUrls: ['./poker-lobby.component.css']
})
export class PokerLobbyComponent {

  @Output() userEmitter: EventEmitter<User> = new EventEmitter();

  cardsets = cardsets;

  userForm = new FormGroup({
    room: new FormControl(''),
    name: new FormControl(''),
    cards: new FormControl(cardsets['Simple Fibonacci'])
  });

  save(): void {
    this.userEmitter.emit(this.userForm.value);
  }

  setCards(newCards: string) {
    this.userForm.get('cards').setValue(newCards);
  }
}
