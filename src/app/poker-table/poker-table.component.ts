import {Component, Input} from '@angular/core';
import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.css']
})
export class PokerTableComponent {

  constructor(private http: HttpClient) {
  }

  @Input() name;
  @Input() room;

  fibReihe = [
    {value: 1, text: '1', styleClass: 'btn-primary'},
    {value: 2, text: '2', styleClass: 'btn-primary'},
    {value: 3, text: '3', styleClass: 'btn-primary'},
    {value: 5, text: '5', styleClass: 'btn-primary'},
    {value: 8, text: '8', styleClass: 'btn-primary'},
    {value: 13, text: '13', styleClass: 'btn-primary'},
    {value: 20, text: '20', styleClass: 'btn-primary'},
    {value: 0, text: '?', styleClass: 'btn-primary'}
  ];
  selectedVote;
  status;

  vote(vote): void {
    this.status = 'wird gespeichert';
    this.http.post(`${environment.baseUrl}/rooms/${this.room}/vote`, {
      name: this.name,
      vote
    }).subscribe((res: HttpResponse<object>) => {
      this.status = "gespeichert";
    }, (error: HttpErrorResponse) => {
      this.status = `Fehler ${error.status} ${error.statusText}`;
    });

    console.log(`${this.name} voted ${vote} in ${this.room}.`);
    this.selectedVote = vote;
  }

  cardDisabled(): string {
    return this.name && this.room ? null : 'disabled';
  }
}
