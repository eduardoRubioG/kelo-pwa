import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { UnitsService } from '../../services/units/units.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PlateKeyDisplayPipe } from '../../pipes/plate-key-display/plate-key-display.pipe';
import { UNITS } from '../../consts/kelo.const';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PlateCalculatorService } from '../../services/plate-calculator/plate-calculator.service';
import { NotificationBannerComponent } from '../notification-banner/notification-banner.component';

@Component({
  selector: 'kelo-single-plate-config-sheet',
  standalone: true,
  imports: [
    CommonModule,
    PlateKeyDisplayPipe,
    ReactiveFormsModule,
    NotificationBannerComponent,
  ],
  templateUrl: './single-plate-config-sheet.component.html',
})
export class SinglePlateConfigSheetComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      plateKey: string;
      plateCount: number;
    },
    private sheetRef: MatBottomSheetRef<SinglePlateConfigSheetComponent>,
    private readonly unitsService: UnitsService,
    private readonly plateCalcService: PlateCalculatorService
  ) {}

  public MAX_VALUE = 9000;
  public value: FormControl<number | null> = new FormControl<number>(
    Number(this.data.plateCount || 0)
  );
  public currentAvailability: number = -1;
  private destroy$: Subject<void> = new Subject<void>();
  public infinityValue = Infinity;

  unitLabel$: Observable<string> = new Observable();
  unitPreference$: Observable<UNITS> = new Observable();

  ngOnInit() {
    this.unitLabel$ = this.unitsService.getOutputUnitLabel$();
    this.unitPreference$ = this.unitsService.getInputUnitPreference$;
    this.currentAvailability = this.getAvailabilityByKey(this.data.plateKey);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  close(): void {
    this.sheetRef.dismiss();
  }

  onSave(): void {
    // TODO: Send out toast to confirm new plate limit is set
    if (this.value.value !== null) {
      this.plateCalcService.setPlateAvailability(
        this.data.plateKey,
        this.value.value
      );
    } else {
      console.error('SinglePlateConfigSheet: Error in saving new plate limit');
    }
    this.close();
  }

  getAvailabilityByKey(key: string): number {
    const availability = this.plateCalcService.getPlateAvailability;
    if (!(key in availability)) {
      console.error(
        `SinglePlateConfigSheet: Key ${key} not found in session availability map`
      );
      return -1;
    }

    return availability[key] === Infinity ? this.MAX_VALUE : availability[key];
  }

  onSetToNoLimit() {
    this.value.setValue(this.MAX_VALUE);
  }
}
