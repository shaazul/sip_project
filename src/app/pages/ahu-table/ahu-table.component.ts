import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-ahu-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    DropdownModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
    ButtonModule
  ],
  templateUrl: './ahu-table.component.html',
  styleUrls: ['./ahu-table.component.scss']
})
export class AhuTableComponent {

  @ViewChild('ahuTable') ahuTable!: Table;

  ahuData = [
    { id: 1, level: 'LGF', description: 'AHU 01 (BANKING OFFICE)', runStatus: 'On', commandStatus: 'On', supplyAirTemp: 15.4, controlMode: 'A' },
    { id: 2, level: 'LGF', description: 'AHU 02 (BANKING OFFICE)', runStatus: 'On', commandStatus: 'On', supplyAirTemp: 16.8, controlMode: 'A' },
    { id: 3, level: 'LGF', description: 'AHU 03', runStatus: 'On', commandStatus: 'On', supplyAirTemp: 16.8, controlMode: 'A' },
    { id: 4, level: 'LGF', description: 'AHU 04', runStatus: 'On', commandStatus: 'On', supplyAirTemp: 16.9, controlMode: 'A' },

    { id: 5, level: 'L01', description: 'AHU 01 (BANKING HALL)', runStatus: 'On', commandStatus: 'On', supplyAirTemp: 14.8, controlMode: 'A' },
    { id: 6, level: 'L01', description: 'AHU 02 (BANKING HALL)', runStatus: 'On', commandStatus: 'On', supplyAirTemp: 16.1, controlMode: 'A' },

    { id: 7, level: 'L05', description: 'AHU 01', runStatus: 'On', commandStatus: 'On', supplyAirTemp: 15.4, controlMode: 'A' },
    { id: 8, level: 'L05', description: 'AHU 02', runStatus: 'On', commandStatus: 'On', supplyAirTemp: 15.8, controlMode: 'A' },

    { id: 9, level: 'L06', description: 'AHU 01', runStatus: 'On', commandStatus: 'On', supplyAirTemp: 13.8, controlMode: 'A' },
    { id: 10, level: 'L06', description: 'AHU 02', runStatus: 'On', commandStatus: 'On', supplyAirTemp: 14.6, controlMode: 'A' },

    { id: 11, level: 'L07', description: 'AHU 01', runStatus: 'On', commandStatus: 'On', supplyAirTemp: 14.5, controlMode: 'A' },
    { id: 12, level: 'L07', description: 'AHU 02', runStatus: 'On', commandStatus: 'On', supplyAirTemp: 12.8, controlMode: 'A' },

    { id: 13, level: 'L08', description: 'AHU 01', runStatus: 'On', commandStatus: 'On', supplyAirTemp: 14.7, controlMode: 'A' },
    { id: 14, level: 'L08', description: 'AHU 02', runStatus: 'On', commandStatus: 'On', supplyAirTemp: 15.0, controlMode: 'A' },

    { id: 15, level: 'L09', description: 'AHU 01', runStatus: 'On', commandStatus: 'On', supplyAirTemp: 18.0, controlMode: 'A' }
  ]

  globalSearch = '';
  selectedLevel: string | null = null;
  selectedDescription: string | null = null;
  selectedRunStatus: string | null = null;
  selectedCommandStatus: string | null = null;
  selectedControlMode: string | null = null;
  selectedTemp: number | null = null;

  runStatusOptions = [
    { label: 'On', value: 'On' },
    { label: 'Off', value: 'Off' }
  ];

  commandStatusOptions = [
    { label: 'On', value: 'On' },
    { label: 'Off', value: 'Off' }
  ];

  controlModeOptions = [
    { label: 'Auto', value: 'A' },
    { label: 'Manual', value: 'Ml' }
  ];

  onGlobalSearch(value: string) {
    this.ahuTable.filterGlobal(value || null, 'contains');
  }

  onTextFilter(field: string, value: string | null) {
    this.ahuTable.filter(value || null, field, 'contains');
  }

  onSelectFilter(field: string, value: any) {
    this.ahuTable.filter(value ?? null, field, 'equals');
  }

  onTempFilter(value: number | null) {
    this.ahuTable.filter(value ?? null, 'supplyAirTemp', 'equals');
  }

  clear(table: Table) {
    table.clear();
    this.globalSearch = '';
    this.selectedLevel = null;
    this.selectedDescription = null;
    this.selectedRunStatus = null;
    this.selectedCommandStatus = null;
    this.selectedControlMode = null;
    this.selectedTemp = null;
  }

  infoVisible = false;
  infoAsset: any = null;

  openInfoDialog(row: any) {
    this.infoAsset = row;
    this.infoVisible = true;
  }

  closeInfoDialog() {
    this.infoVisible = false;
    this.infoAsset = null;
  }
}
