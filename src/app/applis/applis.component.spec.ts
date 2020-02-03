import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplisComponent } from './applis.component';

describe('ApplisComponent', () => {
  let component: ApplisComponent;
  let fixture: ComponentFixture<ApplisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
