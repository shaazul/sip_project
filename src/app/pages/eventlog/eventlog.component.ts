import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-eventlog',
  standalone: true,
  imports: [
    DropdownModule,
    MultiSelectModule,
    CalendarModule,
    ButtonModule,
    CardModule,
    ChartModule,
    FormsModule,
    CommonModule,
    TableModule
  ],
  templateUrl: './eventlog.component.html',
  styleUrl: './eventlog.component.scss'
})
export class EventlogComponent {

  selectedService: any = null;
  selectedLevels: any[] = [];
  startDate?: Date;
  endDate?: Date;

  submitted = false;
  generatedTitle = '';

  showChart = false;
  showTable = false;

  services = [
    { label: 'AHU', value: 'AHU' },
    { label: 'LGT', value: 'LGT' },
    { label: 'WCPU', value: 'WCPU' }
  ];

  levels = [
    { label: 'L01', value: 'L01' },
    { label: 'L02', value: 'L02' },
    { label: 'L03', value: 'L03' },
    { label: 'L04', value: 'L04' },
    { label: 'L05', value: 'L05' },
    { label: 'L06', value: 'L06' }
  ];

  tableData: any[] = [
    { time: '2026-02-04 00:01:00', run: 'Off', trip: 'Off' },
    { time: '2026-02-04 00:02:00', run: 'Off', trip: 'Off' },
    { time: '2026-02-04 00:03:00', run: 'Off', trip: 'Off' },
    { time: '2026-02-04 00:04:00', run: 'Off', trip: 'Off' },
    { time: '2026-02-04 00:05:00', run: 'Off', trip: 'Off' },
    { time: '2026-02-04 00:06:00', run: 'Off', trip: 'Off' },
    { time: '2026-02-04 00:07:00', run: 'Off', trip: 'Off' },
    { time: '2026-02-04 00:08:00', run: 'Off', trip: 'Off' },
    { time: '2026-02-04 00:09:00', run: 'Off', trip: 'Off' },
    { time: '2026-02-04 00:10:00', run: 'Off', trip: 'Off' },
    { time: '2026-02-04 00:11:00', run: 'Off', trip: 'Off' },
    { time: '2026-02-04 00:12:00', run: 'Off', trip: 'Off' },
    { time: '2026-02-04 00:13:00', run: 'Off', trip: 'Off' },
    { time: '2026-02-04 00:14:00', run: 'Off', trip: 'Off' },
    { time: '2026-02-04 00:15:00', run: 'Off', trip: 'Off' },
  ];

  chartData: any;
  chartOptions: any;

  constructor() {

    this.chartData = {
      labels: ['00:01', '04:18', '08:35', '12:52', '17:09', '21:26'],
      datasets: [
        {
          label: 'L06 AHU-01 Run Status',
          data: [0, 0, 1, 1, 1, 0],
          borderColor: '#3b82f6',
          stepped: true,
          borderWidth: 3,
          pointRadius: 4,
          fill: false
        },
        {
          label: 'L06 AHU-01 Trip Status',
          data: [0, 0, 0, 0, 0, 0],
          borderColor: '#22c55e',
          stepped: true,
          borderWidth: 3,
          pointRadius: 4,
          fill: false
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      }
    };
  }

  formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  submit() {

    if (
      !this.selectedService ||
      !this.selectedLevels.length ||
      !this.startDate ||
      !this.endDate
    ) {
      return;
    }

    const service = this.selectedService;
    const levels = this.selectedLevels.length
      ? this.selectedLevels.map(l => l.label).join(', ')
      : '';

    const start = this.formatDate(this.startDate);
    const end = this.formatDate(this.endDate);

    this.generatedTitle = `${service} for ${levels} (${start} to ${end})`;

    this.submitted = true;
    this.showChart = false;
    this.showTable = true;
  }

  openTable() {
    if (!this.submitted) return;

    this.showTable = true;
    this.showChart = false;
  }

  openChart() {
    if (!this.submitted) return;

    this.showChart = true;
    this.showTable = false;
  }

  clear() {
    this.selectedService = null;
    this.selectedLevels = [];
    this.startDate = undefined;
    this.endDate = undefined;

    this.generatedTitle = '';
    this.submitted = false;

    this.showChart = false;
    this.showTable = false;

    this.tableData = [];
    this.chartData = null;
  }

  // get runColumnName(): string {
  //   if (!this.selectedService || !this.selectedLevels?.length) {
  //     return 'Run Status';
  //   }

  //   return `${this.selectedLevels[0].label} ${this.selectedService}-01 Run Status`;
  // }

  // get tripColumnName(): string {
  //   if (!this.selectedService || !this.selectedLevels?.length) {
  //     return 'Trip Status';
  //   }

  get runColumnName(): string {
    if (!this.selectedService || !this.selectedLevels?.length) {
      return 'Run Status';
    }

    const serviceLabel = this.services.find(s => s.value === this.selectedService)?.label;
    const levelLabel = this.selectedLevels[0].label;

    return `${levelLabel} ${serviceLabel}-01 Run Status`;
  }

  get tripColumnName(): string {
    if (!this.selectedService || !this.selectedLevels?.length) {
      return 'Trip Status';
    }

    const serviceLabel = this.services.find(s => s.value === this.selectedService)?.label;
    const levelLabel = this.selectedLevels[0].label;

    return `${levelLabel} ${serviceLabel}-01 Trip Status`;
  }

  downloadCSV() {
    if (!this.tableData.length) return;

    const headers = ['Time', this.runColumnName, this.tripColumnName];

    const rows = this.tableData.map(row =>
      [row.time, row.run, row.trip].join(',')
    );

    const csvContent = [headers.join(','), ...rows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    const fileName = `Event_Log_${this.formatDate(this.startDate!)}_to_${this.formatDate(this.endDate!)}.csv`;

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.click();

    URL.revokeObjectURL(url);
  }

}
