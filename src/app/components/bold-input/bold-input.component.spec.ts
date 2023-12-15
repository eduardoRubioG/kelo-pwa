import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoldInputComponent } from './bold-input.component';

describe('BoldInputComponent', () => {
  let component: BoldInputComponent;
  let fixture: ComponentFixture<BoldInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoldInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoldInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
