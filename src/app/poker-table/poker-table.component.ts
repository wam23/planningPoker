import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.css']
})
export class PokerTableComponent implements OnInit {

  constructor() {
  }

  @Input() name;
  @Input() room;

  ngOnInit(): void {
  }

}
