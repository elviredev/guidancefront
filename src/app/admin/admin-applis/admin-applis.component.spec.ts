import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApplisComponent } from './admin-applis.component';

describe('AdminApplisComponent', () => {
  let component: AdminApplisComponent;
  let fixture: ComponentFixture<AdminApplisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApplisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApplisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
