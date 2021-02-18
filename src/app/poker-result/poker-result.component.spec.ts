import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerResultComponent } from './poker-result.component';

describe('PokerResultComponent', () => {
  let component: PokerResultComponent;
  let fixture: ComponentFixture<PokerResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokerResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
