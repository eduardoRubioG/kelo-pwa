import {
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectableItem } from '../../types/kelo.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'kelo-dropdown-selector',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDividerModule],
  templateUrl: './dropdown-selector.component.html',
  styleUrl: './dropdown-selector.component.scss',
})
export class DropdownSelectorComponent {
  @Input() label: string = '';
  @Input({ transform: booleanAttribute }) fullWidth: boolean = false;
  @Input() items: SelectableItem<unknown>[] = [];
  @Input() placeholder!: string;
  @Output() itemSelected: EventEmitter<unknown> = new EventEmitter<unknown>();
  selectedOption: SelectableItem<unknown> = {
    label: '',
    value: null,
  };
  isOpen: boolean = false;

  toggleDropdown(): void {
    if (this.items.length) {
      this.isOpen = !this.isOpen;
    } else {
      console.error(
        'DropdownSelector: No items were passed into root component'
      );
    }
  }

  selectOption(option: SelectableItem<unknown>): void {
    this.selectedOption = option;
    this.isOpen = false;
    this.itemSelected.emit(option);
  }
}
