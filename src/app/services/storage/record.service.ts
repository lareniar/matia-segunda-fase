import { Injectable } from '@angular/core';
import { Record } from '../../interfaces/form';

@Injectable({
  providedIn: 'root',
})
export class RecordStorageService {
  private recordsKey: string = 'records';
  constructor() {}

  addLocalStorage(records: Record) {
    localStorage.setItem(this.recordsKey, JSON.stringify(records));
  }

  saveLocalStorageArray(records: Record[]) {
    localStorage.setItem(this.recordsKey, JSON.stringify(records));
  }

  getLocalStorage(): Record[] {
    return JSON.parse(localStorage.getItem(this.recordsKey) || '[]');
  }
}
