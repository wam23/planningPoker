import {HttpClient} from '@angular/common/http';
import {OnChanges} from '@angular/core';
import {Component, Input} from '@angular/core';
import {Subscription} from 'rxjs';
import {environment} from '../../environments/environment';

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

  @Input() room;

  cards: Array<Card>;
  mean: number;
  median: number;

  private poll$: Subscription;

  constructor(private http: HttpClient) {
  }

  ngOnChanges() {
    if (this.poll$) {
      this.poll$.unsubscribe();
      this.cards = [];
    }
    if (this.room) {
      this.poll();
    }
  }

  poll() {
    this.poll$ = this.http.get(`${environment.baseUrl}/poll/${this.room}`)
      .subscribe((response: Array<Card>) => {
        let votes = response.map(a => a.vote).filter(a => a > 0);
        this.mean = this.calcMean(votes);
        this.median = this.calcMedian(votes);

        this.cards = response.sort((a, b) => a.vote - b.vote);
        this.poll();
      }, error => {
        console.error(`Polling error: ${error}`);
        this.poll();
      });
  }

  reveal(): void {
    this.http.get(`${environment.baseUrl}/rooms/${this.room}/votes`)
      .subscribe();
  }

  reset(): void {
    this.http.get(`${environment.baseUrl}/rooms/${this.room}/reset`)
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
