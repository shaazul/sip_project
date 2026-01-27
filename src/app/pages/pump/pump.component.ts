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
  selector: 'app-pump',
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
  templateUrl: './pump.component.html',
  styleUrls: ['./pump.component.scss']
})
export class PumpComponent implements OnInit {

  globalSearch = '';
  filterLevel = '';
  filterDescription = '';
  filterStatus: string | null = null;
  filterTrip: string | null = null;

  statusOptions = [
    { label: 'On', value: 'On' },
    { label: 'Off', value: 'Off' }
  ];

  pumpData = [
    { level: 'LB2', description: 'SUMP PIT 2 LB2', status: 'Off', trip: null },
    { level: 'LB2', description: 'SEWERAGE PUMP 1 LB2', status: 'Off', trip: 'Off' },
    { level: 'LB2', description: 'SEWERAGE PUMP 2 LB2', status: 'Off', trip: 'Off' },
    { level: 'LB2', description: 'SEWERAGE PUMP 3 LB2', status: 'Off', trip: 'Off' },
    { level: 'LB2', description: 'SUMP PUMP 1 LB2 (Panel B)', status: 'Off', trip: 'Off' },
    { level: 'LB2', description: 'SUMP PUMP 2 LB2 (Panel B)', status: 'Off', trip: 'Off' },
    { level: 'LB2', description: 'SUMP PUMP 3 LB2 (Panel B)', status: 'Off', trip: 'Off' },
    { level: 'LB2', description: 'DOMESTIC WATER PUMP 1 LB2', status: 'Off', trip: 'Off' },
    { level: 'LB2', description: 'DOMESTIC WATER PUMP 2 LB2', status: 'On', trip: 'Off' },
    { level: 'L15', description: 'DOMESTIC WATER PUMP 1', status: 'Off', trip: 'Off' },
    { level: 'L15', description: 'DOMESTIC WATER PUMP 2', status: 'Off', trip: 'Off' },
    { level: 'L36', description: 'DOMESTIC WATER PUMP 1', status: 'Off', trip: 'Off' },
    { level: 'L36', description: 'DOMESTIC WATER PUMP 2', status: 'Off', trip: 'Off' }
  ];

  originalPumpData: any[] = [];

  pumpInfoVisible = false;
  pumpInfoAsset: any = null;
  chartData: any;
  chartOptions: any;

  ngOnInit(): void {
    this.originalPumpData = [...this.pumpData];
  }

  applyGlobalSearch() {
    const value = this.globalSearch.toLowerCase();

    this.pumpData = this.originalPumpData.filter(pump =>
      pump.level.toLowerCase().includes(value) ||
      pump.description.toLowerCase().includes(value) ||
      pump.status.toLowerCase().includes(value) ||
      (pump.trip ?? '').toLowerCase().includes(value)
    );
  }


  applyFilters() {
    this.pumpData = this.originalPumpData.filter(pump => {

      if (
        this.filterLevel &&
        !pump.level.toLowerCase().includes(this.filterLevel.toLowerCase())
      ) {
        return false;
      }

      if (
        this.filterDescription &&
        !pump.description.toLowerCase().includes(this.filterDescription.toLowerCase())
      ) {
        return false;
      }

      if (this.filterStatus !== null && pump.status !== this.filterStatus) {
        return false;
      }


      if (this.filterTrip !== null && pump.trip !== this.filterTrip) {
        return false;
      }

      return true;
    });
  }

  clearFilters() {
    this.filterLevel = '';
    this.filterDescription = '';
    this.filterStatus = null;
    this.filterTrip = null;
    this.globalSearch = '';
    this.pumpData = [...this.originalPumpData];
  }

  openPumpDialog(pump: any) {
    this.pumpInfoAsset = pump;
    this.loadChartData();
    this.pumpInfoVisible = true;
  }

  closePumpDialog() {
    this.pumpInfoVisible = false;
    this.pumpInfoAsset = null;
  }

  loadChartData() {
    this.chartData = {
      labels: [
        '17:05', '18:00', '19:00', '21:55',
        '02:45', '07:35', '12:25'
      ],
      datasets: [
        {
          label: '010701-3003_CWP-LB2-2-High Alarm',
          data: [0, 0.2, 0.1, 0, 0.3, 0, 0.2],

          borderColor: '#22c55e',
          pointBackgroundColor: '#22c55e',
          pointBorderColor: '#22c55e',

          pointRadius: 4,
          tension: 0.4,
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
          position: 'top',
          labels: {
            color: '#919191ff',
            font: {
              weight: '600'
            }
          }
        }
      },

      scales: {
        x: {
          ticks: {
            color: '#919191ff'
          },
          grid: {
            color: '#919191ff'
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#919191ff'
          },
          grid: {
            color: '#919191ff'
          }
        }
      }
    };
  }

}
