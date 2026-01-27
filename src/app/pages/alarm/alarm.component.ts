import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-alarm',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    IconFieldModule,
    InputIconModule
  ],
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit {

  globalSearch = '';
  infoVisible = false;
  infoAsset: any = null;

  filterController = '';
  filterType: string | null = null;
  filterService: string | null = null;
  filterDescription = '';
  filterStatus: string | null = null;

  alarmData: any[] = [];
  originalAlarmData: any[] = [];

  globalSearchActive = '';
  filterControllerActive = '';
  filterTypeActive: string | null = null;
  filterServiceActive: string | null = null;
  filterDescriptionActive = '';

  activeAlarmData = [
    { controller: 'AHU-L19-01', type: 'Sensor', service: 'AHU', description: 'AHU-L19-01_Return Air CO2 High', occurred: '14/01/2026 01:46:03 pm', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'AHU-L32-02', type: 'Sensor', service: 'AHU', description: 'AHU-L32-02_Supply Air Temp High', occurred: '14/01/2026 01:17:18 pm', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'FAN-LB1-01', type: 'Equipment', service: 'Mechanical Ventilation', description: 'SF-LB1-01_Command Fault', occurred: '14/01/2026 12:39:47 pm', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'AHU-L31-02', type: 'Equipment', service: 'AHU', description: 'AHU-L31-02_Command Fault', occurred: '14/01/2026 11:02:01 am', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'AHU-L31-01', type: 'Sensor', service: 'AHU', description: 'AHU-L31-01_Supply Air Temp High', occurred: '14/01/2026 11:01:10 am', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'LGT-L23-01', type: 'Equipment', service: 'Lighting', description: 'DB-23-1E_Light 09 Command Fault', occurred: '14/01/2026 10:54:33 am', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'AHU-L27-01', type: 'Sensor', service: 'AHU', description: 'AHU-L27-01_Return Air CO2 High', occurred: '14/01/2026 10:28:27 am', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'LGT-L20-01', type: 'Equipment', service: 'Lighting', description: 'DB-20-1_Light 02 Command Fault', occurred: '14/01/2026 10:27:00 am', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'AHU-L11-01', type: 'Sensor', service: 'AHU', description: 'AHU-L11-01_Return Air CO2 High', occurred: '14/01/2026 10:11:49 am', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'AHU-L09-01', type: 'Sensor', service: 'AHU', description: 'AHU-L09-01_Return Air CO2 High', occurred: '14/01/2026 10:09:38 am', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'AHU-L17-01', type: 'Sensor', service: 'AHU', description: 'AHU-L17-01_Return Air CO2 High', occurred: '14/01/2026 09:58:35 am', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'AHU-L32-02', type: 'Equipment', service: 'Lighting', description: 'DB-T32-4_Light 05 Manual Bypass', occurred: '14/01/2026 09:58:33 am', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'AHU-L17-02', type: 'Sensor', service: 'AHU', description: 'AHU-L17-02_Return Air CO2 High', occurred: '14/01/2026 09:54:18 am', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'AHU-L22-02', type: 'Sensor', service: 'AHU', description: 'AHU-L22-02_Return Air CO2 High', occurred: '14/01/2026 09:53:23 am', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'AHU-L25-02', type: 'Sensor', service: 'AHU', description: 'AHU-L25-02_Return Air CO2 High', occurred: '14/01/2026 09:47:30 am', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'AHU-L23-01', type: 'Sensor', service: 'AHU', description: 'AHU-L23-01_Return Air CO2 High', occurred: '14/01/2026 09:46:01 am', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'AHU-L25-01', type: 'Sensor', service: 'AHU', description: 'AHU-L25-01_Return Air CO2 High', occurred: '14/01/2026 09:38:59 am', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'AHU-L26-01', type: 'Sensor', service: 'AHU', description: 'AHU-L26-01_Return Air CO2 High', occurred: '14/01/2026 09:21:48 am', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
    { controller: 'AHU-L18-01', type: 'Sensor', service: 'AHU', description: 'AHU-L18-01_Return Air CO2 High', occurred: '14/01/2026 09:14:26 am', status: 'active', resolvedTime: null, ackTime: null, ackBy: null },
  ];


  filteredActiveAlarms: any[] = [];

  globalSearchHistory = '';
  filterControllerHistory = '';
  filterTypeHistory: string | null = null;
  filterServiceHistory: string | null = null;
  filterDescriptionHistory = '';

  historyAlarmData = [
    { controller: 'AHU-L10-02', type: 'Equipment', service: 'WCPU', description: 'WCPU-L10-02_Space Temp Low', occurred: '14/01/2026 04:39:09 pm', status: 'resolved', resolvedTime: '2026-01-14 16:46:13', ackTime: null, ackBy: null },
    { controller: 'AHU-L10-02', type: 'Equipment', service: 'WCPU', description: 'WCPU-L10-02_Space Temp Low', occurred: '14/01/2026 04:09:23 pm', status: 'resolved', resolvedTime: '2026-01-14 16:17:41', ackTime: null, ackBy: null },
    { controller: 'TNB-LGF-01 (TNB ROOM)', type: 'Equipment', service: 'Mechanical Ventilation', description: 'EF-LGF-05_Command Fault', occurred: '14/01/2026 04:05:29 pm', status: 'resolved', resolvedTime: '2026-01-14 16:06:06', ackTime: null, ackBy: null },
    { controller: 'AHU-L05-02', type: 'Equipment', service: 'ACSU', description: 'ACSU-L05-02_Command Fault', occurred: '14/01/2026 04:01:48 pm', status: 'resolved', resolvedTime: '2026-01-14 16:04:56', ackTime: null, ackBy: null },
    { controller: 'AHU-L24-01', type: 'Sensor', service: 'AHU', description: 'AHU-L24-01_Return Air CO2 High', occurred: '14/01/2026 03:48:42 pm', status: 'resolved', resolvedTime: '2026-01-14 16:09:26', ackTime: null, ackBy: null },
    { controller: 'AHU-L10-02', type: 'Equipment', service: 'WCPU', description: 'WCPU-L10-02_Space Temp Low', occurred: '14/01/2026 03:41:37 pm', status: 'resolved', resolvedTime: '2026-01-14 15:49:49', ackTime: null, ackBy: null },
    { controller: 'AHU-L01-02 (BANKING HALL)', type: 'Sensor', service: 'AHU', description: 'AHU-L01-02_Return Air CO2 High', occurred: '14/01/2026 03:34:06 pm', status: 'resolved', resolvedTime: '2026-01-14 15:44:05', ackTime: null, ackBy: null },
    { controller: 'AHU-L13-02', type: 'Sensor', service: 'AHU', description: 'AHU-L13-02_Return Air CO2 High', occurred: '14/01/2026 02:59:50 pm', status: 'resolved', resolvedTime: '2026-01-14 15:02:05', ackTime: null, ackBy: null },
    { controller: 'AHU-L10-02', type: 'Equipment', service: 'WCPU', description: 'WCPU-L10-02_Space Temp Low', occurred: '14/01/2026 02:57:03 pm', status: 'resolved', resolvedTime: '2026-01-14 15:03:26', ackTime: null, ackBy: null },
    { controller: 'AHU-L10-02', type: 'Equipment', service: 'WCPU', description: 'WCPU-L10-02_Space Temp Low', occurred: '14/01/2026 02:31:54 pm', status: 'resolved', resolvedTime: '2026-01-14 14:38:05', ackTime: null, ackBy: null },
    { controller: 'TNB-LGF-01 (TNB ROOM)', type: 'Equipment', service: 'Mechanical Ventilation', description: 'EF-LGF-05_Command Fault', occurred: '14/01/2026 02:17:47 pm', status: 'resolved', resolvedTime: '2026-01-14 14:18:24', ackTime: null, ackBy: null },
    { controller: 'AHU-L32-02', type: 'Sensor', service: 'AHU', description: 'AHU-L32-02_Supply Air Temp High', occurred: '14/01/2026 02:11:08 pm', status: 'resolved', resolvedTime: '2026-01-14 14:11:10', ackTime: null, ackBy: null },
    { controller: 'AHU-L10-02', type: 'Equipment', service: 'WCPU', description: 'WCPU-L10-02_Space Temp Low', occurred: '14/01/2026 02:06:12 pm', status: 'resolved', resolvedTime: '2026-01-14 14:10:11', ackTime: null, ackBy: null },
    { controller: 'TNB-LGF-01 (TNB ROOM)', type: 'Equipment', service: 'Mechanical Ventilation', description: 'EF-LGF-05_Command Fault', occurred: '14/01/2026 01:56:35 pm', status: 'resolved', resolvedTime: '2026-01-14 13:57:50', ackTime: null, ackBy: null },
    { controller: 'TNB-LGF-01 (TNB ROOM)', type: 'Equipment', service: 'Mechanical Ventilation', description: 'EF-LGF-05_Command Fault', occurred: '14/01/2026 01:51:35 pm', status: 'resolved', resolvedTime: '2026-01-14 13:52:12', ackTime: null, ackBy: null },
    { controller: 'TNB-LGF-01 (TNB ROOM)', type: 'Equipment', service: 'Mechanical Ventilation', description: 'EF-LGF-05_Command Fault', occurred: '14/01/2026 01:39:08 pm', status: 'resolved', resolvedTime: '2026-01-14 13:39:47', ackTime: null, ackBy: null },
    { controller: 'AHU-L19-01', type: 'Sensor', service: 'AHU', description: 'AHU-L19-01_Return Air CO2 High', occurred: '14/01/2026 01:33:57 pm', status: 'resolved', resolvedTime: '2026-01-14 13:41:25', ackTime: null, ackBy: null },
    { controller: 'TNB-LGF-01 (TNB ROOM)', type: 'Equipment', service: 'Mechanical Ventilation', description: 'EF-LGF-05_Command Fault', occurred: '14/01/2026 01:31:01 pm', status: 'resolved', resolvedTime: '2026-01-14 13:31:39', ackTime: null, ackBy: null },
  ];


  filteredHistoryAlarms: any[] = [];

  typeOptions = [
    { label: 'Sensor', value: 'Sensor' },
    { label: 'Equipment', value: 'Equipment' }
  ];

  serviceOptions = [
    { label: 'AHU', value: 'AHU' },
    { label: 'Mechanical Ventilation', value: 'Mechanical Ventilation' },
    { label: 'Lighting', value: 'Lighting' }
  ];

  statusOptions = [
    { label: 'active', value: 'active' }
  ];

  ngOnInit(): void {
    this.filteredActiveAlarms = [...this.activeAlarmData];
    this.filteredHistoryAlarms = [...this.historyAlarmData];
  }

  applyFilters() {
    this.alarmData = this.originalAlarmData.filter(alarm => {
      if (this.filterController && !alarm.controller.toLowerCase().includes(this.filterController.toLowerCase())) return false;
      if (this.filterType && alarm.type !== this.filterType) return false;
      if (this.filterService && alarm.service !== this.filterService) return false;
      if (this.filterDescription && !alarm.description.toLowerCase().includes(this.filterDescription.toLowerCase())) return false;
      if (this.filterStatus && alarm.status !== this.filterStatus) return false;
      if (this.globalSearch && !JSON.stringify(alarm).toLowerCase().includes(this.globalSearch.toLowerCase())) return false;
      return true;
    });
  }

  applyActiveFilters() {
    this.filteredActiveAlarms = this.activeAlarmData.filter(a => {
      if (this.filterControllerActive && !a.controller.toLowerCase().includes(this.filterControllerActive.toLowerCase())) return false;
      if (this.filterTypeActive && a.type !== this.filterTypeActive) return false;
      if (this.filterServiceActive && a.service !== this.filterServiceActive) return false;
      if (this.filterDescriptionActive && !a.description.toLowerCase().includes(this.filterDescriptionActive.toLowerCase())) return false;
      if (this.globalSearchActive && !JSON.stringify(a).toLowerCase().includes(this.globalSearchActive.toLowerCase())) return false;
      return true;
    });
  }

  applyHistoryFilters() {
    this.filteredHistoryAlarms = this.historyAlarmData.filter(a => {
      if (this.filterControllerHistory && !a.controller.toLowerCase().includes(this.filterControllerHistory.toLowerCase())) return false;
      if (this.filterTypeHistory && a.type !== this.filterTypeHistory) return false;
      if (this.filterServiceHistory && a.service !== this.filterServiceHistory) return false;
      if (this.filterDescriptionHistory && !a.description.toLowerCase().includes(this.filterDescriptionHistory.toLowerCase())) return false;
      if (this.globalSearchHistory && !JSON.stringify(a).toLowerCase().includes(this.globalSearchHistory.toLowerCase())) return false;
      return true;
    });
  }

  clearActiveFilters() {
    this.globalSearchActive = '';
    this.filterControllerActive = '';
    this.filterTypeActive = null;
    this.filterServiceActive = null;
    this.filterDescriptionActive = '';
    this.filteredActiveAlarms = [...this.activeAlarmData];
  }

  clearHistoryFilters() {
    this.globalSearchHistory = '';
    this.filterControllerHistory = '';
    this.filterTypeHistory = null;
    this.filterServiceHistory = null;
    this.filterDescriptionHistory = '';
    this.filteredHistoryAlarms = [...this.historyAlarmData];
  }

  clearFilters() {
    this.filterController = '';
    this.filterType = null;
    this.filterService = null;
    this.filterDescription = '';
    this.filterStatus = null;
    this.globalSearch = '';
    this.alarmData = [...this.originalAlarmData];
  }

  openInfoDialog(alarm: any) {
    this.infoAsset = alarm;
    this.infoVisible = true;
  }

  closeInfoDialog() {
    this.infoVisible = false;
    this.infoAsset = null;
  }

  setExportDataActive() {
    this.alarmData = [...this.filteredActiveAlarms];
  }

  setExportDataHistory() {
    this.alarmData = [...this.filteredHistoryAlarms];
  }

  getCurrentDateTime(): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  }

  exportToPDF(isHistory = false) {
    const data = isHistory
      ? this.filteredHistoryAlarms
      : this.filteredActiveAlarms;

    const title = isHistory
      ? 'Historical Alarm Summary'
      : 'Active Alarm Summary';

    const doc = new jsPDF({ orientation: 'landscape' });

    doc.setFontSize(14);
    doc.text(title, 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [[
        'Controller',
        'Type',
        'Service',
        'Description',
        'Occurred',
        'Status',
        'Resolved Time',
        'Acknowledged Time',
        'Acknowledged By'
      ]],
      body: data.map(a => [
        a.controller,
        a.type,
        a.service,
        a.description,
        a.occurred,
        a.status,
        a.resolvedTime || '-',
        a.ackTime || '-',
        a.ackBy || '-'
      ]),
      styles: { fontSize: 8 }
    });

    doc.save(`${title.replaceAll(' ', '_')}_${this.getCurrentDateTime()}.pdf`);
  }

  exportToExcel(isHistory = false) {
    const data = isHistory
      ? this.filteredHistoryAlarms
      : this.filteredActiveAlarms;

    if (!data.length) {
      alert('No alarm data to export');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(
      data.map(a => ({
        Controller: a.controller,
        Type: a.type,
        Service: a.service,
        Description: a.description,
        Occurred: a.occurred,
        Status: a.status,
        'Resolved Time': a.resolvedTime || '-',
        'Acknowledged Time': a.ackTime || '-',
        'Acknowledged By': a.ackBy || '-'
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      wb,
      ws,
      isHistory ? 'Historical_Alarms' : 'Active_Alarms'
    );

    XLSX.writeFile(
      wb,
      `${isHistory ? 'Historical' : 'Active'}_Alarm_Summary_${this.getCurrentDateTime()}.xlsx`
    );
  }


  exportToCSV(isHistory = false) {
    const data = isHistory
      ? this.filteredHistoryAlarms
      : this.filteredActiveAlarms;

    if (!data.length) {
      alert('No alarm data to export');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(
      data.map(a => ({
        Controller: a.controller,
        Type: a.type,
        Service: a.service,
        Description: a.description,
        Occurred: a.occurred,
        Status: a.status,
        'Resolved Time': a.resolvedTime || '-',
        'Acknowledged Time': a.ackTime || '-',
        'Acknowledged By': a.ackBy || '-'
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      wb,
      ws,
      isHistory ? 'Historical_Alarms' : 'Active_Alarms'
    );

    XLSX.writeFile(
      wb,
      `${isHistory ? 'Historical' : 'Active'}_Alarm_Summary_${this.getCurrentDateTime()}.csv`,
      { bookType: 'csv' }
    );
  }

}
