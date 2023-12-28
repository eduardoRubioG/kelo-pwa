import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlateConfigSheetComponent } from './single-plate-config-sheet.component';

describe('SinglePlateConfigSheetComponent', () => {
  let component: SinglePlateConfigSheetComponent;
  let fixture: ComponentFixture<SinglePlateConfigSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePlateConfigSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinglePlateConfigSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
