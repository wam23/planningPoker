import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerLobbyComponent } from './poker-lobby.component';

describe('PokerLobbyComponent', () => {
  let component: PokerLobbyComponent;
  let fixture: ComponentFixture<PokerLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokerLobbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
