import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsHistory } from './bookings-history';

describe('BookingsHistory', () => {
  let component: BookingsHistory;
  let fixture: ComponentFixture<BookingsHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingsHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
