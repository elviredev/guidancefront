import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContentsComponent } from './admin-contents.component';

describe('AdminContentsComponent', () => {
  let component: AdminContentsComponent;
  let fixture: ComponentFixture<AdminContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
