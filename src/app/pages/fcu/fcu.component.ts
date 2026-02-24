import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-fcu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
    DropdownModule
  ],
  templateUrl: './fcu.component.html',
  styleUrls: ['./fcu.component.scss']
})
export class FcuComponent implements OnInit {

  globalSearch = '';
  infoVisible = false;
  infoAsset: any = null;

  filterLevel = '';
  filterStatus = '';
  filterTemp = '';
  filterTimer: string | null = null;
  filterMode: string | null = null;

  timerOptions = [
    { label: 'Start', value: 'Start' },
    { label: 'Stop', value: 'Stop' }
  ];

  controlModeOptions = [
    { label: 'Auto', value: 'Auto' },
    { label: 'Manual', value: 'Manual' }
  ];

  fcuData = [
    {
      level: 'L01',
      fcus: [
        { name: 'FCU 01', status: 'On', timer: 'Stop', temp: 28.9, mode: 'Auto' },
        { name: 'FCU 02', status: 'On', timer: 'Stop', temp: 26.8, mode: 'Auto' }
      ]
    },
    {
      level: 'L06',
      fcus: [
        { name: 'FCU 01', status: 'On', timer: 'Start', temp: 27.8, mode: 'Auto' }
      ]
    },
    {
      level: 'L12',
      fcus: [
        { name: 'FCU 01', status: 'Off', timer: 'Start', temp: null, mode: 'Auto' },
        { name: 'FCU 02', status: 'Off', timer: 'Start', temp: null, mode: 'Auto' }
      ]
    },
    {
      level: 'L16',
      fcus: [
        { name: 'FCU 01', status: 'On', timer: 'Start', temp: 26.0, mode: 'Auto' },
        { name: 'FCU 02', status: 'On', timer: 'Start', temp: null, mode: 'Auto' }
      ]
    },
    {
      level: 'L23',
      fcus: Array.from({ length: 11 }, (_, i) => ({
        name: `FCU ${String(i + 1).padStart(2, '0')}`,
        status: i === 0 ? 'On' : 'Off',
        timer: 'Stop',
        temp: null,
        mode: 'Auto'
      }))
    },
    {
      level: 'L25',
      fcus: Array.from({ length: 16 }, () => ({
        name: `FCU`,
        status: 'Off',
        timer: null,
        temp: null,
        mode: 'Auto'
      }))
    },
    {
      level: 'L27',
      fcus: [
        { name: 'FCU 01', status: 'On', timer: 'Start', temp: 27.9, mode: 'Auto' },
        { name: 'FCU 02', status: 'On', timer: 'Start', temp: null, mode: 'Auto' }
      ]
    },
    {
      level: 'L35',
      fcus: Array.from({ length: 9 }, () => ({
        name: `FCU`,
        status: 'Off',
        timer: null,
        temp: null,
        mode: 'Auto'
      }))
    },
    {
      level: 'L36',
      fcus: [
        { name: 'FCU 01', status: 'On', timer: 'Start', temp: 29.6, mode: 'Auto' },
        { name: 'FCU 02', status: 'On', timer: 'Start', temp: null, mode: 'Auto' }
      ]
    },
    {
      level: 'LRF',
      fcus: [
        { name: 'FCU 01', status: 'On', timer: 'Start', temp: 25.4, mode: 'Auto' }
      ]
    }
  ];

  originalFcuData: any[] = [];

  fcuPanels = [
    {
      code: 'FCU-L01',
      type: 'Fan Coil Unit',
      rows: [
        { no: '01', command: 'Manual Off', status: 'On', operation: 'Bypass' },
        { no: '02', command: 'System Timer', status: 'On', operation: 'Bypass' }
      ]
    }
  ];

  ngOnInit(): void {
    this.originalFcuData = [...this.fcuData];
  }

  applyFilters() {
    this.fcuData = this.originalFcuData
      .map(level => {
        const filteredFcus = level.fcus.filter((fcu: any) => {

          if (
            this.filterStatus &&
            !fcu.name.toLowerCase().includes(this.filterStatus.toLowerCase())
          ) {
            return false;
          }

          if (
            this.filterTimer &&
            fcu.timer !== this.filterTimer
          ) {
            return false;
          }

          if (
            this.filterTemp &&
            (fcu.temp === null ||
              !fcu.temp.toString().includes(this.filterTemp))
          ) {
            return false;
          }

          if (
            this.filterMode &&
            fcu.mode !== this.filterMode
          ) {
            return false;
          }

          return true;
        });

        return {
          ...level,
          fcus: filteredFcus
        };
      })

      .filter(level => {

        if (this.globalSearch) {
          const keyword = this.globalSearch.toLowerCase();

          const levelMatch = level.level.toLowerCase().includes(keyword);

          const fcuMatch = level.fcus.some((fcu: any) =>
            fcu.name.toLowerCase().includes(keyword) ||
            (fcu.temp !== null && fcu.temp.toString().includes(keyword))
          );

          if (!levelMatch && !fcuMatch) {
            return false;
          }
        }

        if (
          this.filterLevel &&
          !level.level.toLowerCase().includes(this.filterLevel.toLowerCase())
        ) {
          return false;
        }

        return level.fcus.length > 0;
      });

  }

  clearFilters() {
    this.filterLevel = '';
    this.filterStatus = '';
    this.filterTemp = '';
    this.filterTimer = null;
    this.filterMode = null;
    this.globalSearch = '';
    this.fcuData = [...this.originalFcuData];
  }

  openInfoDialog(fcu: any) {
    this.infoAsset = fcu;
    this.infoVisible = true;
  }

  openLevelDialog(row: any) {
    this.infoAsset = row;
    this.infoVisible = true;
  }

  closeInfoDialog() {
    this.infoVisible = false;
    this.infoAsset = null;
  }
}
