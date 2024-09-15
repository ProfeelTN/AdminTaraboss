import { Directive, EventEmitter, Input, Output } from '@angular/core';

// Rotates sorting directions
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

@Directive({
  selector: 'th[sortable]',  // Ensures this directive is applied on table headers
  host: {
    '[class.asc]': 'direction === "asc"',  // Adds asc class when ascending
    '[class.desc]': 'direction === "desc"',  // Adds desc class when descending
    '(click)': 'rotate()'  // Rotates direction on click
  }
})
export class NgbdGridJsSortableHeader {

  @Input() sortable: SortColumn = '';  // Column to be sorted
  @Input() direction: SortDirection = '';  // Current sort direction (asc, desc, or none)
  @Output() sort = new EventEmitter<SortEvent>();  // Emits sort event with column and direction

  rotate() {
    this.direction = rotate[this.direction];  // Rotate the direction
    this.sort.emit({ column: this.sortable, direction: this.direction });  // Emit the new sort state
  }
}


export type SortColumn = 'title' | 'company' | 'location' | 'poste' | 'type' | 'createdAt' | ''; 
export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}
