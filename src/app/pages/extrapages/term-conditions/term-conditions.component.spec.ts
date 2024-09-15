import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermConditionsComponent } from './term-conditions.component';

describe('TermConditionsComponent', () => {
  let component: TermConditionsComponent;
  let fixture: ComponentFixture<TermConditionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermConditionsComponent]
    });
    fixture = TestBed.createComponent(TermConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
