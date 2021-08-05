import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  cardsets = {
    "Simple Fibonacci": "1,2,3,5,8,13,20,?",
    "Fibonacci ": "0,1,2,3,5,8,13,21,34,55,89,?",
    "Mountain Goat": "0,0.5,1,2,3,5,8,13,20,40,100,?",
    "Sequential": "0,1,2,3,4,5,6,7,8,9,10,?",
    "T-Shirt": "XS,S,M,L,XL,?"
  }

  userForm = new FormGroup({
    room: new FormControl(''),
    name: new FormControl(''),
    cards: new FormControl(this.cardsets['Simple Fibonacci'])
  });

  save(): void {
    this.userEmitter.emit(this.userForm.value);
  }

  setCards(newCards: string) {
    this.userForm.get('cards').setValue(newCards);
  }
}
