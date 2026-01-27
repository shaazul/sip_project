import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-breaker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
    ChartModule
  ],
  templateUrl: './breaker.component.html',
  styleUrls: ['./breaker.component.scss']
})
export class BreakerComponent implements OnInit {

  globalSearch = '';
  filterLevel = '';
  filterDescription = '';
  filterStatus: string | null = null;

  statusOptions = [
    { label: 'On', value: 'On' },
    { label: 'Off', value: 'Off' }
  ];

  breakerData = [
    { level: 'L08', description: 'G3-2 300A TPN SPARE', status: 'Off' },
    { level: 'L08', description: 'G4-4 60A NET OP CENTRE AC1', status: 'On' },
    { level: 'L08', description: 'G4-5 60A NET OP CENTRE AC2', status: 'On' },
    { level: 'L08', description: 'G4-7 30A 3PN SPARE', status: 'Off' },
    { level: 'L08', description: 'G4 800A FROM MSB STANDBY', status: 'On' },
    { level: 'L08', description: 'G4-8 30A 6TH FLOOR', status: 'On' },
    { level: 'L08', description: 'G4-9 30A 9TH FLOOR NEW', status: 'On' },
    { level: 'L08', description: '30A DB-A-U COMP OP CENTRE', status: 'On' },
    { level: 'L08', description: '30A DB-ITD 8TH FLOOR', status: 'On' },
    { level: 'L08', description: '30A DB-UPS-3', status: 'On' },
    { level: 'L08', description: '30A PRINTER ROOM 4TH FLOOR', status: 'On' },
    { level: 'L08', description: '30A SUB-DB-IN-GEN PRINTING', status: 'On' },
    { level: 'L08', description: 'UPS SB1 400A FROM UPS', status: 'On' },
    { level: 'L08', description: '30A CONTROL ROOM', status: 'On' },
    { level: 'L08', description: '30A DB-NDMS-5TH FLOOR', status: 'On' },
    { level: 'L08', description: '30A DB-UPS-24TH FLOOR', status: 'On' },
    { level: 'L08', description: '30A SPARE-1', status: 'Off' }
  ];

  originalBreakerData: any[] = [];

  breakerInfoVisible = false;
  breakerInfoAsset: any = null;

  chartData: any;
  chartOptions: any;

  ngOnInit(): void {
    this.originalBreakerData = [...this.breakerData];
  }

  applyFilters() {
    this.breakerData = this.originalBreakerData.filter(item => {

      if (
        this.filterLevel &&
        !item.level.toLowerCase().includes(this.filterLevel.toLowerCase())
      ) {
        return false;
      }

      if (
        this.filterDescription &&
        !item.description.toLowerCase().includes(this.filterDescription.toLowerCase())
      ) {
        return false;
      }

      if (
        this.filterStatus &&
        item.status !== this.filterStatus
      ) {
        return false;
      }

      return true;
    });
  }

  clearFilters() {
    this.filterLevel = '';
    this.filterDescription = '';
    this.filterStatus = null;
    this.globalSearch = '';
    this.breakerData = [...this.originalBreakerData];
  }

  openBreakerDialog(row: any) {
    this.breakerInfoAsset = row;
    this.loadChartData();
    this.breakerInfoVisible = true;
  }

  closeBreakerDialog() {
    this.breakerInfoVisible = false;
    this.breakerInfoAsset = null;
  }

  loadChartData() {
    this.chartData = {
      labels: [
        '2026-01-12 16:35:00',
        '2026-01-12 21:25:00',
        '2026-01-13 02:15:00',
        '2026-01-13 07:05:00',
        '2026-01-13 11:55:00'
      ],
      datasets: [
        {
          label: 'Breaker Status',
          data: [1, 1, 1, 1, 1],

          borderColor: '#22c55e',
          pointBackgroundColor: '#22c55e',
          pointBorderColor: '#22c55e',

          pointRadius: 4,
          tension: 0,
          backgroundColor: 'transparent'
        }
      ]
    };


    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#6b7280',
            font: { weight: '600' }
          }
        }
      },

      scales: {
        x: {
          ticks: {
            color: '#6b7280',
            maxRotation: 0,
            autoSkip: true
          },
          grid: {
            color: '#e5e7eb'
          }
        },
        y: {
          min: 0.4,
          max: 1.6,
          ticks: {
            stepSize: 0.2,
            color: '#6b7280'
          },
          grid: {
            color: '#e5e7eb'
          }
        }
      }
    };
  }
}
