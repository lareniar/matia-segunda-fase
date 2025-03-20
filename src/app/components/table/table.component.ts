import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Record } from '../../interfaces/form';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() records: Record[] = [];
  @Input() tableHeaders: string[] = [];

  deleteRecord() {
    this.records.pop();
  }
}
