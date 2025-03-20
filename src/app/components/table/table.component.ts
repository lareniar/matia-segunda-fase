import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Record } from '../../interfaces/form';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnChanges {
  @Input() records: Record[] = [];
  @Output() recordsChange = new EventEmitter<Record[]>();
  @Input() tableHeaders: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  onDeleteRecord() {
    this.records.pop();
    this.recordsChange.emit(this.records);
  }
}
