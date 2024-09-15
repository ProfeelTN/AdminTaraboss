import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SweetalertsComponent } from './sweetalerts.component';

describe('SweetalertsComponent', () => {
  let component: SweetalertsComponent;
  let fixture: ComponentFixture<SweetalertsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SweetalertsComponent]
    });
    fixture = TestBed.createComponent(SweetalertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
