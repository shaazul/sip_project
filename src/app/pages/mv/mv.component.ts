import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-mv',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
    DropdownModule
  ],
  templateUrl: './mv.component.html',
  styleUrls: ['./mv.component.scss']
})
export class MvComponent {

  globalSearch = '';

  levelFilter = '';
  descFilter = '';
  runStatusFilter: string | null = null;
  controlModeFilter: string | null = null;

  mvData = [
    { id: 1, level: 'LB2', description: 'EF-01', runStatus: 'On', controlMode: 'A' },
    { id: 2, level: 'LB2', description: 'EF-02', runStatus: 'On', controlMode: 'A' },
    { id: 3, level: 'LB2', description: 'EF-02', runStatus: 'On', controlMode: 'A' },
    { id: 4, level: 'LB2', description: 'SF-01', runStatus: 'On', controlMode: 'A' },
    { id: 5, level: 'LB2', description: 'SF-02', runStatus: 'On', controlMode: 'A' },
    { id: 6, level: 'LB2', description: 'SF-02', runStatus: 'On', controlMode: 'A' },

    { id: 7, level: 'LB1', description: 'EF-01', runStatus: 'On', controlMode: 'A' },
    { id: 8, level: 'LB1', description: 'EF-02', runStatus: 'On', controlMode: 'A' },
    { id: 9, level: 'LB1', description: 'EF-03', runStatus: 'On', controlMode: 'A' },
    { id: 10, level: 'LB1', description: 'EF-04', runStatus: 'On', controlMode: 'A' },
    { id: 11, level: 'LB1', description: 'EF-05', runStatus: 'On', controlMode: 'A' },
    { id: 12, level: 'LB1', description: 'EF-06', runStatus: 'On', controlMode: 'A' },
    { id: 13, level: 'LB1', description: 'EF-07', runStatus: 'On', controlMode: 'A' },
    { id: 14, level: 'LB1', description: 'EF-08', runStatus: 'On', controlMode: 'A' },
    { id: 15, level: 'LB1', description: 'EF-09', runStatus: 'On', controlMode: 'A' },
    { id: 16, level: 'LB1', description: 'EF-10', runStatus: 'On', controlMode: 'A' },
    { id: 17, level: 'LB1', description: 'EF-11', runStatus: 'On', controlMode: 'A' }
  ];

  runStatusOptions = [
    { label: 'On', value: 'On' },
    { label: 'Off', value: 'Off' }
  ];

  controlModeOptions = [
    { label: 'A', value: 'A' },
    { label: 'M', value: 'M' }
  ];

  mvPanels = [
    {
      code: 'EF-LB2',
      type: 'Exhaust Fan',
      rows: [
        { no: '01', command: 'System Timer', status: 'On', operation: 'Start' },
        { no: '02', command: 'System Timer', status: 'On', operation: 'Start' },
        { no: '03', command: 'System Timer', status: 'On', operation: 'Start' }
      ]
    },
    {
      code: 'SF-LB2',
      type: 'Supply Fan',
      rows: [
        { no: '01', command: 'System Timer', status: 'On', operation: 'Start' },
        { no: '02', command: 'System Timer', status: 'On', operation: 'Start' },
        { no: '03', command: 'System Timer', status: 'On', operation: 'Start' }
      ]
    }
  ];

  infoVisible = false;
  infoAsset: any = null;

  clear(table: any) {
    table.clear();

    this.globalSearch = '';

    this.levelFilter = '';
    this.descFilter = '';
    this.runStatusFilter = null;
    this.controlModeFilter = null;
  }

  onFilterChange(value: any, filter: Function) {
    setTimeout(() => filter(value), 0);
  }

  openInfoDialog(row: any) {
    this.infoAsset = row;
    this.infoVisible = true;
  }

  closeInfoDialog() {
    this.infoVisible = false;
    this.infoAsset = null;
  }
}
