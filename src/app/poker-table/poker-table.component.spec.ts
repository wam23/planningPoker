import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerTableComponent } from './poker-table.component';

describe('PokerTableComponent', () => {
  let component: PokerTableComponent;
  let fixture: ComponentFixture<PokerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokerTableComponent],
      providers: [provideHttpClient(withInterceptorsFromDi())]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerTableComponent);
    component = fixture.componentInstance;
    component.user = {name: 'User', room: 'Test', theme: 'gold'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
