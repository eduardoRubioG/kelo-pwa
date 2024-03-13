import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpeCalculatorViewComponent } from './rpe-calculator-view.component';

describe('RpeCalculatorViewComponent', () => {
  let component: RpeCalculatorViewComponent;
  let fixture: ComponentFixture<RpeCalculatorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RpeCalculatorViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RpeCalculatorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
