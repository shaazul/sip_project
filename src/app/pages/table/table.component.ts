import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    SelectModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @ViewChild('dt2') dt2!: Table;

  currentView: '3d' | 'schematic' = '3d';

  setView(view: '3d' | 'schematic') {
    this.currentView = view;
  }

  globalFilter = '';
  loading = false;
  selectedStatus: string | null = null;
  selectedAuto: string | null = null;
  selectedAlarm: boolean | null = null;

  chillerData = [
    { id: 1, system: 'System Chiller 1', description: 'CHILLER 01', status: 'ON', auto: 'On', alarm: false },
    { id: 2, system: 'System Chiller 1', description: 'PCHWP 01', status: 'ON', auto: 'On', alarm: false },
    { id: 3, system: 'System Chiller 1', description: 'CHILLER 01', status: 'OFF', auto: 'On', alarm: true },
    { id: 4, system: 'System Chiller 2', description: 'CHILLER 02', status: 'ON', auto: 'Off', alarm: false },
    { id: 5, system: 'System Chiller 2', description: 'CHILLER 02', status: 'OFF', auto: 'On', alarm: true },
    { id: 6, system: 'System Chiller 3', description: 'PCHWP 03', status: 'OFF', auto: 'On', alarm: true },
    { id: 7, system: 'System Chiller 3', description: 'CHILLER 03', status: 'ON', auto: 'Off', alarm: true },
    { id: 8, system: 'System Chiller 3', description: 'PCHWP 03', status: 'ON', auto: 'On', alarm: false },
    { id: 9, system: 'System Chiller 4', description: 'CHILLER 04', status: 'ON', auto: 'On', alarm: false }
  ];

  statusOptions = [
    { label: 'ON', value: 'ON' },
    { label: 'OFF', value: 'OFF' }
  ];

  alarmOptions = [
    { label: 'Alarm', value: true },
    { label: 'Normal', value: false }
  ];

  onSelectFilter(field: string, value: any) {
    this.dt2.filter(value, field, 'equals');
  }

  applyChillerFilter() {
    if (this.dt2) {
      this.dt2.filterGlobal(this.globalFilter, 'contains');
    }
  }

  clearChillerFilters() {
    this.globalFilter = '';
    this.selectedStatus = null;
    this.selectedAlarm = null;
    this.dt2.clear();
  }

}
