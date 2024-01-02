import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarSelectorComponent } from './bar-selector.component';

describe('BarSelectorComponent', () => {
  let component: BarSelectorComponent;
  let fixture: ComponentFixture<BarSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
