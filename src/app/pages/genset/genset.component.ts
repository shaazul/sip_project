import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-genset',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    TableModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    ButtonModule
  ],
  templateUrl: './genset.component.html',
  styleUrl: './genset.component.scss'
})
export class GensetComponent implements OnInit {

  levels = [
    { label: 'Level 1', value: 1 },
    { label: 'Level 2', value: 2 }
  ];
  selectedLevel = this.levels[0];

  diesel: any;
  gensetData: any[] = [];

  dieselCurrentDisplay = '';
  dieselFullDisplay = '';
  dieselThresholdDisplay = '';

  globalSearch = '';

  levelDataMap: any = {
    1: {
      diesel: {
        current: 2.67,
        full: 4.11,
        threshold: 2.88,
        percentage: 60
      },
      gensetData: [
        { parameter: 'Current (A)', v1: '5.0', v2: '5.0' },
        { parameter: 'Voltage (V)', v1: '500.0V', v2: '500.0V' },
        { parameter: 'Power Factor', v1: '0.4', v2: '0.5' },
        { parameter: 'Auto Main Failure 01', v1: 'On', v2: 'Off' },
        { parameter: 'Auto Main Failure 02', v1: 'Off', v2: 'Off' }
      ]
    },
    2: {
      diesel: {
        current: 3.42,
        full: 4.50,
        threshold: 3.00,
        percentage: 76
      },
      gensetData: [
        { parameter: 'Current (A)', v1: '6.5', v2: '6.2' },
        { parameter: 'Voltage (V)', v1: '480.0V', v2: '480.0V' },
        { parameter: 'Power Factor', v1: '0.6', v2: '0.7' },
        { parameter: 'Auto Main Failure 01', v1: 'Off', v2: 'Off' },
        { parameter: 'Auto Main Failure 02', v1: 'On', v2: 'On' }
      ]
    }
  };

  ngOnInit() {
    this.applyLevelData(this.selectedLevel.value);
  }

  onLevelChange() {
    this.applyLevelData(this.selectedLevel.value);
  }

  applyLevelData(level: number) {
    const data = this.levelDataMap[level];

    this.diesel = data.diesel;
    this.gensetData = data.gensetData;

    this.dieselCurrentDisplay = `${this.diesel.current} ft`;
    this.dieselFullDisplay = `${this.diesel.full} ft`;
    this.dieselThresholdDisplay = `${this.diesel.threshold} ft`;
  }

  clear(table: Table) {
    this.globalSearch = '';
    table.clear();
  }
}
