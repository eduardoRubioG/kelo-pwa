import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateCalculatorViewComponent } from './plate-calculator-view.component';

describe('PlateCalculatorViewComponent', () => {
  let component: PlateCalculatorViewComponent;
  let fixture: ComponentFixture<PlateCalculatorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlateCalculatorViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlateCalculatorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
