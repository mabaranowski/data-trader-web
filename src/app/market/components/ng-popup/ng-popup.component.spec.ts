import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPopupComponent } from './ng-popup.component';

describe('NgPopupComponent', () => {
  let component: NgPopupComponent;
  let fixture: ComponentFixture<NgPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
