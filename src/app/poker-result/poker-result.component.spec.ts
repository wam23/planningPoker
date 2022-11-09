import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerResultComponent } from './poker-result.component';

describe('PokerResultComponent', () => {
  let component: PokerResultComponent;
  let fixture: ComponentFixture<PokerResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PokerResultComponent]
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

  it('should calculate mean', () => {
    expect(component.calcMean([])).toBeFalsy();
    expect(component.calcMean([5])).toBe(5);
    expect(component.calcMean([3, 4])).toBe(3.5);
    expect(component.calcMean([1, 2, 3, 4, 5])).toBe(3);
    expect(component.calcMean([1, 1, 1, 1, 10])).toBe(2.8);
  });

  it('should calculate median', () => {
    expect(component.calcMedian([])).toBeFalsy();
    expect(component.calcMedian([5])).toBe(5);
    expect(component.calcMedian([3, 4])).toBe(3.5);
    expect(component.calcMedian([1, 2, 3, 4, 5])).toBe(3);
    expect(component.calcMedian([1, 1, 1, 1, 10])).toBe(1);
  });

  it('should sanitize header', () => {
    expect(component.sanitizeHeader(null)).toBeNull();
    expect(component.sanitizeHeader('')).toBe('');
    expect(component.sanitizeHeader('test')).toBe('test');
    expect(component.sanitizeHeader('Foöé☕')).toBe('Fooee');
  })
});
