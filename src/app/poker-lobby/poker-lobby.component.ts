import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ThemeService } from '../services/theme.service';

export interface User {
  name: string;
  room: string;
  theme: string;
}

@Component({
  selector: 'app-poker-lobby',
  templateUrl: './poker-lobby.component.html',
  styleUrls: ['./poker-lobby.component.css'],
})
export class PokerLobbyComponent {
  @Output() userEmitter: EventEmitter<User> = new EventEmitter();
  @ViewChild('pokerLobbyForm', { static: true }) ngForm: NgForm;
  private formChangesSubscription: Subscription;

  constructor(private theme: ThemeService) {}

  save(form: NgForm): void {
    const user = {
      name: form.value.name,
      room: form.value.room,
      theme: form.value.theme,
    } as User;
    this.userEmitter.emit(user);
  }

  ngOnInit() {
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(
      (form) => {
        if (form.theme) {
          this.theme.loadTheme(form.theme);
        }
      }
    );
  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }
}
