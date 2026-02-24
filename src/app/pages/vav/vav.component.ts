import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-vav',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
    ButtonModule
  ],
  templateUrl: './vav.component.html',
  styleUrls: ['./vav.component.scss']
})
export class VavComponent {

  globalSearch = '';
  selectedLevel = '';
  selectedRoomId = '';
  selectedTemp: number | null = null;

  vavVisible = false;

  originalVavData = [
    {
      level: 'LGF',
      rooms: [
        { id: '01', temp: 23.6 },
        { id: '02', temp: 23.5 },
        { id: '03', temp: 23.1 },
        { id: '04', temp: 23.3 },
        { id: '05', temp: 24.9 },
        { id: '06', temp: 24.1 },
        { id: '08', temp: 23.2 },
        { id: '09', temp: 23.4 },
        { id: '10', temp: 22.8 }
      ]
    },
    {
      level: 'L05',
      rooms: [
        { id: '01', temp: 24.0 },
        { id: '02', temp: 23.0 },
        { id: '03', temp: 24.5 },
        { id: '04', temp: 24.0 },
        { id: '05', temp: 22.8 },
        { id: '06', temp: 20.8 },
        { id: '07', temp: 20.1 },
        { id: '08', temp: 23.4 },
        { id: '09', temp: 23.3 },
        { id: '10', temp: 22.5 },
        { id: '11', temp: 23.3 },
        { id: '12', temp: 23.9 },
        { id: '13', temp: 21.8 },
        { id: '14', temp: 22.7 },
        { id: '15', temp: 22.0 }
      ]
    },
    {
      level: 'L06',
      rooms: [
        { id: '01', temp: 22.3 },
        { id: '02', temp: 23.6 },
        { id: '03', temp: 23.6 },
        { id: '04', temp: 23.7 },
        { id: '05', temp: 23.2 },
        { id: '06', temp: 22.8 },
        { id: '07', temp: 23.1 },
        { id: '08', temp: 21.5 },
        { id: '09', temp: 23.2 },
        { id: '10', temp: 23.7 },
        { id: '11', temp: 23.9 },
        { id: '12', temp: 23.5 },
        { id: '13', temp: 23.4 },
        { id: '14', temp: 24.0 },
        { id: '15', temp: 25.0 }
      ]
    }
  ];

  vavData = [...this.originalVavData];

  vavDetailData = [
    { id: '01', roomTemp: 25.3, damper: 100, setpoint: 23.0 },
    { id: '02', roomTemp: 25.5, damper: 100, setpoint: 23.0 },
    { id: '03', roomTemp: 24.7, damper: 100, setpoint: 23.0 },
    { id: '04', roomTemp: 25.5, damper: 100, setpoint: 23.0 },
    { id: '05', roomTemp: 26.0, damper: 100, setpoint: 23.0 },
    { id: '06', roomTemp: 25.2, damper: 100, setpoint: 23.0 },
    { id: '08', roomTemp: 24.2, damper: 100, setpoint: 23.0 },
    { id: '09', roomTemp: 24.6, damper: 100, setpoint: 23.0 },
    { id: '10', roomTemp: 24.2, damper: 100, setpoint: 23.0 }
  ];

applyFilters() {
  const keyword = this.globalSearch.trim().toLowerCase();

  this.vavData = this.originalVavData.filter(level => {

    if (keyword) {
      const levelMatch = level.level.toLowerCase().includes(keyword);

      const roomMatch = level.rooms.some(room =>
        room.id.toLowerCase().includes(keyword) ||
        room.temp.toString().includes(keyword)
      );

      if (!levelMatch && !roomMatch) {
        return false;
      }
    }

    if (
      this.selectedLevel &&
      !level.level.toLowerCase().includes(this.selectedLevel.toLowerCase())
    ) {
      return false;
    }

    return level.rooms.some(room => {

      if (
        this.selectedRoomId &&
        !room.id.includes(this.selectedRoomId)
      ) {
        return false;
      }

      if (
        this.selectedTemp !== null &&
        room.temp !== this.selectedTemp
      ) {
        return false;
      }

      return true;
    });
  });
}

  clear() {
    this.globalSearch = '';
    this.selectedLevel = '';
    this.selectedRoomId = '';
    this.selectedTemp = null;
    this.vavData = [...this.originalVavData];
  }

  getTempClass(temp: number): string {
    return temp >= 23 ? 'green' : 'blue';
  }

  openVavInfoDialog(row: any) {
    this.vavVisible = true;
  }

  closeVavInfoDialog() {
    this.vavVisible = false;
  }
}
