import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlights } from './add-flights';

describe('AddFlights', () => {
  let component: AddFlights;
  let fixture: ComponentFixture<AddFlights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFlights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFlights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
