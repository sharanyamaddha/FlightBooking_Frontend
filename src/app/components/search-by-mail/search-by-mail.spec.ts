import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByMail } from './search-by-mail';

describe('SearchByMail', () => {
  let component: SearchByMail;
  let fixture: ComponentFixture<SearchByMail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchByMail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByMail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
