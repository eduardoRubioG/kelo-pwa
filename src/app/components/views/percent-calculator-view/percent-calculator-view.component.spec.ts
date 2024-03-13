import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentCalculatorViewComponent } from './percent-calculator-view.component';

describe('PercentCalculatorViewComponent', () => {
  let component: PercentCalculatorViewComponent;
  let fixture: ComponentFixture<PercentCalculatorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercentCalculatorViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PercentCalculatorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
