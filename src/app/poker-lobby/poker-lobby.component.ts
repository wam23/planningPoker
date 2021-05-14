import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface User {
  name: string;
  room: string;
  cardset: string;
}

@Component({
  selector: 'app-poker-lobby',
  templateUrl: './poker-lobby.component.html',
  styleUrls: ['./poker-lobby.component.css']
})
export class PokerLobbyComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  @Output() userEmitter: EventEmitter<User> = new EventEmitter();
  public cardsets$: Observable<any>;

  ngOnInit(): void {
    this.cardsets$ = this.http.get(`${environment.baseUrl}/cardsets`) as Observable<any>;
  }

  save(form: NgForm): void {
    const user = {name: form.value.name, room: form.value.room, cardset: form.value.cardset} as User;
    this.userEmitter.emit(user);
  }
}
