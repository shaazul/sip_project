import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    AccordionModule
  ],
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent {

  selectedLevel: string | null = null;
  selectedService: string | null = null;
  appliedLevel: string | null = null;

  levelOptions = [
    { label: 'Level 01', value: 'Level 01' },
    { label: 'Level 02', value: 'Level 02' },
    { label: 'Level 03', value: 'Level 03' },
    { label: 'Level 04', value: 'Level 04' },
    { label: 'Level 05', value: 'Level 05' },
    { label: 'Level 06', value: 'Level 06' },
    { label: 'Level 07', value: 'Level 07' },
    { label: 'Level 08', value: 'Level 08' },
    { label: 'Level 09', value: 'Level 09' },
    { label: 'Level 10', value: 'Level 10' }
  ];

  serviceOptions = [
    { label: 'Mechanical', value: 'Mechanical' },
    { label: 'Electrical', value: 'Electrical' },
    { label: 'Fire System', value: 'Fire' }
  ];

  floorPanels = [
    {
      code: 'FLOOR-L01',
      type: 'Air Handling Unit',
      rows: [
        { no: '01', command: 'Manual Off', status: 'On', operation: 'Bypass' },
        { no: '02', command: 'System Timer', status: 'On', operation: 'Bypass' }
      ]
    }
  ];

  mvPanels = [
    {
      code: 'EF-LB2',
      type: 'Exhaust Fan',
      rows: [
        { no: '01', command: 'System Timer', status: 'On', operation: 'Start' },
        { no: '02', command: 'System Timer', status: 'On', operation: 'Start' },
        { no: '03', command: 'System Timer', status: 'On', operation: 'Start' }
      ]
    },
    {
      code: 'SF-LB2',
      type: 'Supply Fan',
      rows: [
        { no: '01', command: 'System Timer', status: 'On', operation: 'Start' },
        { no: '02', command: 'System Timer', status: 'On', operation: 'Start' },
        { no: '03', command: 'System Timer', status: 'On', operation: 'Start' }
      ]
    }
  ];

  vavDetailData = [
    { id: '01', roomTemp: 25.3, damper: 100, setpoint: 23.0 },
    { id: '02', roomTemp: 25.5, damper: 100, setpoint: 23.0 },
    { id: '03', roomTemp: 24.7, damper: 100, setpoint: 23.0 },
    { id: '04', roomTemp: 25.5, damper: 100, setpoint: 23.0 },
    { id: '05', roomTemp: 26.0, damper: 100, setpoint: 23.0 },
    { id: '06', roomTemp: 25.2, damper: 100, setpoint: 23.0 },
    { id: '08', roomTemp: 24.2, damper: 100, setpoint: 23.0 },
    { id: '09', roomTemp: 24.6, damper: 100, setpoint: 23.0 },
    { id: '10', roomTemp: 24.2, damper: 100, setpoint: 23.0 },
  ];

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

  get floorImage(): string {
    return this.appliedLevel
      ? 'assets/icons/all.png'
      : 'assets/icons/empty.png';
  }

  clearLevel() {
  this.selectedLevel = null;
  this.appliedLevel = null;
}

  submitFilter() {
    if (!this.selectedLevel) return;

    this.appliedLevel = this.selectedLevel;
    console.log('Applied Level:', this.appliedLevel);
  }

}
