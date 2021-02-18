import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poker-result',
  templateUrl: './poker-result.component.html',
  styleUrls: ['./poker-result.component.css']
})
export class PokerResultComponent {

  @Input() room;

  cards;
  mean;
  median;

  constructor(private http: HttpClient) {
  }

  reveal(): void {
    this.http.get(`https://planningpoker-server.azurewebsites.net/rooms/${this.room}/votes`)
      .subscribe(data => {
        let votes = Object.values(data).filter(a => a > 0);
        this.mean = this.calcMean(votes);
        this.median = this.calcMedian(votes);

        this.cards = Object.keys(data).reduce((ary, key) => {
          ary.push({ name: key, vote: data[key] });
          return ary;
        }, []);
        this.cards.sort((a, b) => a.vote - b.vote);
      });
  }

  reset(): void {
    this.http.get(`https://planningpoker-server.azurewebsites.net/rooms/${this.room}/reset`)
      .subscribe(() => {
        this.cards = {};
      });
  }

  calcMean(array): number {
    return array.reduce((p, c) => p + c, 0) / array.length
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
