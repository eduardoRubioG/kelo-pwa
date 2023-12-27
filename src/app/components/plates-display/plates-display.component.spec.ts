import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatesDisplayComponent } from './plates-display.component';

describe('PlatesDisplayComponent', () => {
  let component: PlatesDisplayComponent;
  let fixture: ComponentFixture<PlatesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatesDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlatesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
