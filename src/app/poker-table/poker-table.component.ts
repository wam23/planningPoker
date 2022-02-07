import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../poker-lobby/poker-lobby.component';
import {Observable} from 'rxjs';
import {publishReplay, refCount} from 'rxjs/operators';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.css']
})
export class PokerTableComponent implements OnInit {

  @Input() user: User;
  selectedVote: number;
  status = 'lade Karten';
  cardset$: Observable<string[]>;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.cardset$ = this.http.get(`${environment.baseUrl}/cardset`) as Observable<string[]>;

    this.cardset$.pipe(publishReplay(1), refCount()).subscribe((value) => {
      this.status = 'initialisiert';
    }, () => {
      this.status = 'Kartenset Fehler';
    });
  }

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
