import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieReservationComponent } from './movie-reservation.component';

describe('MovieReservationComponent', () => {
  let component: MovieReservationComponent;
  let fixture: ComponentFixture<MovieReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
