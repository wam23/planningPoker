import {Component, Input} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../poker-lobby/poker-lobby.component';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.css']
})
export class PokerTableComponent {

  constructor(private http: HttpClient) {
  }

  @Input() user: User;

  fibReihe = [
    {value: 1, text: '1', styleClass: 'fib1 fib'},
    {value: 2, text: '2', styleClass: 'fib2 fib'},
    {value: 3, text: '3', styleClass: 'fib3 fib'},
    {value: 5, text: '5', styleClass: 'fib5 fib'},
    {value: 8, text: '8', styleClass: 'fib8 fib'},
    {value: 13, text: '13', styleClass: 'fib13 fib'},
    {value: 21, text: '21', styleClass: 'fib21 fib'},
    {value: 0, text: '?', styleClass: 'fibq fib'}
  ];
  selectedVote: number;
  status = 'initialisiert';

  vote(vote): void {
    this.status = 'wird gespeichert';
    this.http.post(`${environment.baseUrl}/rooms/${this.user.room}/vote`, {
      name: this.user.name,
      vote
    }).subscribe((res: HttpResponse<object>) => {
      this.status = 'gespeichert';
    }, (error: HttpErrorResponse) => {
      this.status = `Fehler ${error.status} ${error.statusText}`;
      this.selectedVote = undefined;
    });

    this.selectedVote = vote;
  }

  cardDisabled(): string {
    return this.user.name && this.user.room ? null : 'disabled';
  }

  resetSelection(): void {
    this.selectedVote = undefined;
  }
}
