import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerSpaceReservationComponent } from './maker-space-reservation.component';

describe('MakerSpaceResevationComponent', () => {
  let component: MakerSpaceReservationComponent;
  let fixture: ComponentFixture<MakerSpaceReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerSpaceReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerSpaceReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
