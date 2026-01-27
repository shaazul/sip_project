import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { Table } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'app-pdb',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    ChartModule,
    DialogModule,
  ],
  templateUrl: './pdb.component.html',
  styleUrl: './pdb.component.scss'
})
export class PdbComponent {

  globalSearch = '';
  displayChart = false;
  selectedPdb: any;

  data: any;
  options: any;


  pdbData = [
    { pdbId: 'PDB-01', location: 'Level 1 - Electrical Room', voltage: '415 / 415', current: '32.5', power: '22.4', energy: '1450', freq: '50', breaker: 'ON', remarks: 'Normal' },
    { pdbId: 'PDB-02', location: 'Level 2 - AHU Area', voltage: '415 / 415', current: '28.1', power: '18.9', energy: '1230', freq: '50', breaker: 'OFF', remarks: 'Maintenance' },
    { pdbId: 'PDB-03', location: 'Level 3 - Lift Lobby', voltage: '415 / 415', current: '30.2', power: '20.1', energy: '1380', freq: '50', breaker: 'ON', remarks: 'Normal' },
    { pdbId: 'PDB-04', location: 'Level 4 - Office Area', voltage: '415 / 415', current: '26.8', power: '17.6', energy: '1195', freq: '50', breaker: 'ON', remarks: 'Normal' },
    { pdbId: 'PDB-05', location: 'Level 5 - Data Room', voltage: '415 / 415', current: '35.4', power: '24.3', energy: '1620', freq: '50', breaker: 'ON', remarks: 'High Load' },
    { pdbId: 'PDB-06', location: 'Basement - Car Park', voltage: '415 / 415', current: '22.7', power: '14.9', energy: '980', freq: '50', breaker: 'OFF', remarks: 'Shutdown' },
    { pdbId: 'PDB-07', location: 'Roof - Mechanical Floor', voltage: '415 / 415', current: '31.6', power: '21.8', energy: '1410', freq: '50', breaker: 'ON', remarks: 'Normal' },
    { pdbId: 'PDB-08', location: 'Level 1 - Retail Area', voltage: '415 / 415', current: '27.9', power: '18.3', energy: '1255', freq: '50', breaker: 'ON', remarks: 'Normal' },
    { pdbId: 'PDB-09', location: 'Level 2 - Pantry', voltage: '415 / 415', current: '19.4', power: '12.6', energy: '840', freq: '50', breaker: 'ON', remarks: 'Low Load' },
    { pdbId: 'PDB-10', location: 'Level 3 - Server Room', voltage: '415 / 415', current: '36.1', power: '25.2', energy: '1705', freq: '50', breaker: 'ON', remarks: 'Critical Load' },
    { pdbId: 'PDB-11', location: 'Level 4 - Corridor', voltage: '415 / 415', current: '21.3', power: '13.9', energy: '905', freq: '50', breaker: 'ON', remarks: 'Normal' },
    { pdbId: 'PDB-12', location: 'Ground Floor - Lobby', voltage: '415 / 415', current: '24.6', power: '16.2', energy: '1100', freq: '50', breaker: 'OFF', remarks: 'Inspection' }
  ];


  clear(table: Table) {
    this.globalSearch = '';
    table.clear();
  }

  closePdbDialog() {
  this.displayChart = false;
  this.selectedPdb = null;
}

  viewChart(row: any) {
    this.selectedPdb = row;
    this.displayChart = true;

    this.data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Power (kW)',
          data: [
            Number(row.power) - 2,
            Number(row.power) - 1,
            Number(row.power),
            Number(row.power) + 1,
            Number(row.power),
            Number(row.power) + 2
          ],
          borderColor: '#3B82F6',
          pointBackgroundColor: '#3B82F6',
          pointBorderColor: '#3B82F6',
          tension: 0.4
        },
        {
          label: 'Energy (kWh)',
          data: [
            Number(row.energy) - 200,
            Number(row.energy) - 150,
            Number(row.energy),
            Number(row.energy) + 150,
            Number(row.energy) + 300,
            Number(row.energy) + 450
          ],
          borderColor: '#10b981',
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#10b981',
          tension: 0.4
        }
      ]
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
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
          ticks: {
            color: '#919191ff'
          },
          grid: {
            color: '#919191ff'
          },
          beginAtZero: true
        }
      }
    };

  }

}
