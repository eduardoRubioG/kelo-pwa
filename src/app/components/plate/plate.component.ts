import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { UnitsService } from '../../services/units/units.service';
import { PlateKeyDisplayPipe } from '../../pipes/plate-key-display/plate-key-display.pipe';
import { Observable } from 'rxjs';
import { UNITS } from '../../consts/kelo.const';
import { PlateColorCodePipe } from '../../pipes/plate-color-code/plate-color-code.pipe';
import { SinglePlateConfigSheetComponent } from '../single-plate-config-sheet/single-plate-config-sheet.component';

@Component({
  selector: 'kelo-plate',
  standalone: true,
  imports: [
    CommonModule,
    PlateKeyDisplayPipe,
    PlateColorCodePipe,
    MatBottomSheetModule,
  ],
  templateUrl: './plate.component.html',
})
export class PlateComponent {
  @Input() plateKey: string = '';
  @Input() plateCount: number = 0;

  public unitPreference: Observable<UNITS> = new Observable();
  readonly UNITS = UNITS;

  constructor(
    private readonly unitsService: UnitsService,
    private sheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.unitPreference = this.unitsService.getOutputUnitPreference$;
  }

  openSinglePlateConfigSheet(): void {
    this.sheet.open(SinglePlateConfigSheetComponent, {
      data: {
        plateKey: this.plateKey,
        plateCount: this.plateCount,
      },
    });
  }
}
