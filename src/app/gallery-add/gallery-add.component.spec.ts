import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryAddComponent } from './gallery-add.component';

describe('GalleryAddComponent', () => {
  let component: GalleryAddComponent;
  let fixture: ComponentFixture<GalleryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});