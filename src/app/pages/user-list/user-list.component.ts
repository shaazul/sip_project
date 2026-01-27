import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule, Table } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    CheckboxModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  globalSearch = '';
  isVisible = false;
  isNew = true;

  infoVisible = false;
  selectedUser: any;
  userModules: string[] = [];
  selectedModules: string[] = [];

  user: any = {};

  allModules: string[] = [
    'Dashboard',
    'AHU',
    'VAV',
    'Chiller',
    'Electrical',
    'Genset',
    'PDB',
    'User List'
  ];

  users = [
    { displayName: 'Admin', username: 'admin', email: 'admin@email.com', lastLogin: '2025-11-03 11:21:54', role: 'Admin', modules: [''] },
    { displayName: 'Nur Aisyah', username: 'nur.aisyah', email: 'nur.aisyah@email.com', lastLogin: '2025-11-29 10:35:18', role: 'Viewer', modules: ['Dashboard'] },
    { displayName: 'Muhammad Faiz', username: 'muhammad.faiz', email: 'm.faiz@email.com', lastLogin: '2025-11-28 16:48:02', role: 'Engineer', modules: ['Dashboard', 'AHU', 'VAV', 'Chiller', 'Genset'] },
    { displayName: 'Siti Aminah', username: 'siti.aminah', email: 'siti.aminah@email.com', lastLogin: '2025-11-28 14:05:33', role: 'Viewer', modules: ['Dashboard'] },
    { displayName: 'Aiman Hakimi', username: 'aiman.hakimi', email: 'aiman.hakimi@email.com', lastLogin: '2025-11-27 18:22:10', role: 'Engineer', modules: ['Dashboard', 'Electrical', 'Genset', 'PDB'] },
    { displayName: 'Nur Syafiqah', username: 'nur.syafiqah', email: 'nur.syafiqah@email.com', lastLogin: '2025-11-27 11:40:55', role: 'Viewer', modules: ['Dashboard'] },
    { displayName: 'Daniel Amir', username: 'daniel.amir', email: 'daniel.amir@email.com', lastLogin: '2025-11-26 09:58:41', role: 'Engineer', modules: ['Dashboard', 'AHU', 'Chiller', 'Electrical'] },
    { displayName: 'Afiq Izzat', username: 'afiq.izzat', email: 'afiq.izzat@email.com', lastLogin: '2025-11-26 15:17:06', role: 'Viewer', modules: ['Dashboard'] },
    { displayName: 'Nurul Huda', username: 'nurul.huda', email: 'nurul.huda@email.com', lastLogin: '2025-11-25 13:09:28', role: 'Viewer', modules: ['Dashboard'] },
    { displayName: 'Farah Nadia', username: 'farah.nadia', email: 'farah.nadia@email.com', lastLogin: '2025-11-25 08:45:12', role: 'Engineer', modules: ['Dashboard', 'AHU', 'VAV', 'Electrical', 'PDB'] }

  ];

  roles = [
    {
      name: 'Admin',
      modules: [
        'Dashboard',
        'User Management',
        'Asset Management',
        'Reports',
        'Settings'
      ]
    },
    {
      name: 'Engineer',
      modules: [
        'Dashboard',
        'Asset Management',
        'Maintenance'
      ]
    },
    {
      name: 'Viewer',
      modules: [
        'Dashboard'
      ]
    }
  ];

  constructor(private confirmationService: ConfirmationService) { }

  clear(table: Table) {
    this.globalSearch = '';
    table.clear();
  }

  openNew() {
    this.isNew = true;
    this.user = {};
    this.selectedModules = [];
    this.isVisible = true;
  }

  editUser(row: any) {
    this.isNew = false;
    this.user = { ...row };
    this.selectedModules = row.modules ? [...row.modules] : [];
    this.isVisible = true;
  }

  cancelDialog() {
    this.isVisible = false;
    this.user = {};
  }

  createUser() {
    this.users.push({
      ...this.user,
      modules: [...this.selectedModules],
      lastLogin: '-'
    });
    this.isVisible = false;
  }

  updateUser() {
    const index = this.users.findIndex(u => u.username === this.user.username);
    if (index !== -1) {
      this.users[index] = {
        ...this.user,
        modules: [...this.selectedModules]
      };
    }
    this.isVisible = false;
  }


  confirmDelete(row: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${row.username}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', outlined: true },
      accept: () => {
        this.users = this.users.filter(u => u.username !== row.username);
      }
    });
  }

  //   if(row.role === 'Admin') {
  //   this.selectedModules = [...this.allModules];
  // }

  // viewUserInfo(row: any) {
  //   this.selectedUser = row;
  //   this.selectedModules = row.modules ? [...row.modules] : [];
  //   // const role = this.roles.find(r => r.name === row.role);
  //   // this.userModules = role ? role.modules : [];
  //   // this.selectedModules = [...this.userModules];
  //   this.infoVisible = true;
  // }

  viewUserInfo(row: any) {
    this.selectedUser = row;

    if (row.role === 'Admin') {
      this.selectedModules = [...this.allModules];
    } else {
      this.selectedModules = row.modules ? [...row.modules] : [];
    }

    this.infoVisible = true;
  }



}
