import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../poker-lobby/poker-lobby.component';
import { NgIf, NgFor, NgClass, DecimalPipe } from '@angular/common';

interface Card {
  name: string;
  vote: any;
  displayValue: any;
}

@Component({
  selector: 'app-poker-result',
  templateUrl: './poker-result.component.html',
  styleUrls: ['./poker-result.component.css', '../animations.css'],
  imports: [NgIf, NgFor, NgClass, DecimalPipe]
})
export class PokerResultComponent implements OnChanges {

  @Input() user: User;

  @Output() resetSelections = new EventEmitter<Event>();
  @Output() showPyro = new EventEmitter<boolean>();
  @Output() revealCards = new EventEmitter<boolean>();

  cards: Array<Card>;
  mean: number;
  median: number;
  revealor: string;
  resetter: string;

  private poll$: Subscription;
  allSameResult = false;

  constructor(private http: HttpClient) {
  }

  ngOnChanges(): void {
    if (this.poll$) {
      this.poll$.unsubscribe();
      this.cards = [];
    }
    if (this.user.room) {
      this.http.get(`${environment.baseUrl}/poll/${this.user.room}/init`)
        .subscribe((response: any) => {

          this.revealor = response.revealor;
          this.resetter = response.resetter;

          this.cards = response.votes;

          this.replaceMagicCardNumbers(this.cards);
          this.handleResults(this.cards);
          this.handleRevealor(this.revealor, this.cards);
        });
      this.poll();
    }
  }

  poll(): void {
    this.poll$ = this.http.get(`${environment.baseUrl}/poll/${this.user.room}`)
      .pipe(timeout(110000)) // Azure has connection timeout of 120s
      .subscribe((response: any) => {

        this.revealor = response.revealor;
        this.resetter = response.resetter;

        this.handleRevealor(this.revealor, this.cards);

        this.handleResults(response.result);

        this.replaceMagicCardNumbers(this.cards);

        this.poll();
      }, error => {
        console.info(`Restart polling: ${error.message}`);
        this.poll();
      });
  }

  reveal(): void {
    this.http.get(`${environment.baseUrl}/rooms/${this.user.room}/votes`, {
      headers: new HttpHeaders({
        'x-user': this.sanitizeHeader(this.user.name)
      })
    })
      .subscribe();
  }

  reset(): void {
    if (confirm('Tabelle wirklich leeren?')) {
      this.http.get(`${environment.baseUrl}/rooms/${this.user.room}/reset`, {
        headers: new HttpHeaders({
          'x-user': this.sanitizeHeader(this.user.name)
        })
      })
        .subscribe();
    }
  }

  sanitizeHeader(input) {
    if (!input) {
      return input;
    }

    input = input.replace(/ä/g, 'ae');
    input = input.replace(/á/g, 'a');
    input = input.replace(/à/g, 'a');
    input = input.replace(/ó/g, 'o');
    input = input.replace(/ò/g, 'o');
    input = input.replace(/ö/g, 'oe');
    input = input.replace(/ú/g, 'u');
    input = input.replace(/ù/g, 'u');
    input = input.replace(/ü/g, 'ue');
    input = input.replace(/ß/g, 'ss');
    input = input.replace(/Ä/g, 'Ae');
    input = input.replace(/Á/g, 'A');
    input = input.replace(/À/g, 'A');
    input = input.replace(/Ö/g, 'Oe');
    input = input.replace(/Ó/g, 'O');
    input = input.replace(/Ò/g, 'O');
    input = input.replace(/Ú/g, 'U');
    input = input.replace(/Ù/g, 'U');
    input = input.replace(/Ü/g, 'Ue');
    input = input.replace(/É/g, 'E');
    input = input.replace(/È/g, 'E');
    input = input.replace(/é/g, 'e');
    input = input.replace(/è/g, 'e');

    // filter non-ascii characters
    return input.replace(/[^\x00-\x7F]/g, '');
  }

  calcMean(array): number {
    array = array.filter(value => !isNaN(value));
    return array.reduce((p, c) => p + c, 0) / array.length;
  }

  calcMedian(array): number {
    array = array.filter(value => !isNaN(value));
    const sorted = array.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
  }

  allSame(array): void {
    this.allSameResult = array.every(value => !isNaN(value)) && array.length > 1 && array.every((val, i, arr) => val === arr[0]);
    this.showPyro.emit(this.allSameResult);
  }

  colorHsl(card): string {
    let hue = 50;
    let sat = 100;
    let lig = 80;

    const cardvalues = this.cards.map(c => c.vote).filter(value => !isNaN(value)).filter(value => value > 0);
    if (cardvalues.length > 0) {
      const min = Math.min(...cardvalues);
      const max = Math.max(...cardvalues);
      if (max !== min) {
        hue = Math.round((card.vote - min) / (max - min) * 100); // hue 0 - 100
      }
    }

    return 'hsl(' + hue + ', ' + sat + '%, ' + lig + '%)';
  }

  softReset() {
    return this.cards.every(card => card.vote === -1);
  }

  replaceMagicCardNumbers(cards) {
    cards.forEach(card => {
      card.displayValue = card.vote;
      if (card.vote === 0) {
        card.displayValue = '🤔';
      }
      if (card.vote === -1) {
        card.displayValue = '⏳';
      }
    });
  }

  private handleRevealor(revealor, cards) {
    if (revealor && !cards.every(x => x.vote === -1)) {
      this.revealCards.emit(true);
    } else {
      this.revealCards.emit(false);
    }
  }

  private handleResults(result) {
    if (result.length === 0 || result.every(x => x.vote === -1)) {
      this.resetSelections.emit();
    }

    const votes = result.map(a => a.vote).filter(a => a > 0);

    this.mean = this.calcMean(votes);
    this.median = this.calcMedian(votes);
    this.allSame(votes);

    this.cards = result.sort((a, b) => {
      // fix sort order of ?
      if (isNaN(a.vote)) {
        return -1;
      }
      if (isNaN(b.vote)) {
        return 1;
      }
      return a.vote - b.vote;
    });
  }
}
