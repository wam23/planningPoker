import {HttpClient} from '@angular/common/http';
import {Component, Input, OnChanges} from '@angular/core';
import {Subscription} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../poker-lobby/poker-lobby.component';

interface Card {
  name: string;
  vote: number;
}

@Component({
  selector: 'app-poker-result',
  templateUrl: './poker-result.component.html',
  styleUrls: ['./poker-result.component.css']
})
export class PokerResultComponent implements OnChanges {

  @Input() user: User;

  cards: Array<Card>;
  mean: number;
  median: number;

  private poll$: Subscription;

  constructor(private http: HttpClient) {
  }

  ngOnChanges(): void {
    if (this.poll$) {
      this.poll$.unsubscribe();
      this.cards = [];
    }
    if (this.user.room) {
      this.http.get(`${environment.baseUrl}/poll/${this.user.room}/init`)
        .subscribe();
      this.poll();
    }
  }

  poll(): void {
    this.poll$ = this.http.get(`${environment.baseUrl}/poll/${this.user.room}`)
      .subscribe((response: Array<Card>) => {

        if (response.length === 0) {
          console.log('should reset');
        }

        const votes = response.map(a => a.vote).filter(a => a > 0);


        this.mean = this.calcMean(votes);
        this.median = this.calcMedian(votes);

        this.cards = response.sort((a, b) => a.vote - b.vote);

        this.poll();
      }, error => {
        // Azure has connection timeout of 120s, so this happens often
        console.error(`Polling error: ${error.message}`);
        setTimeout(() => {
          this.poll();
        }, 1000);
      });
  }

  reveal(): void {
    this.http.get(`${environment.baseUrl}/rooms/${this.user.room}/votes`)
      .subscribe();
  }

  reset(): void {
    this.http.get(`${environment.baseUrl}/rooms/${this.user.room}/reset`)
      .subscribe();
  }

  calcMean(array): number {
    return array.reduce((p, c) => p + c, 0) / array.length;
  }

  calcMedian(array): number {
    const sorted = array.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
  }
}
