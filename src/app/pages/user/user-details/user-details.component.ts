import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ImageModule } from 'primeng/image';


import { LayoutService } from '../../../layout/service/layout.service';


@Component({
  selector: 'app-user-details',
  imports: [ButtonModule, InputTextModule,FormsModule, CommonModule, PasswordModule, ImageModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  previewUrl: string | null = null;
  showPreview = false;




  @Input() users: any;
  isActive: any = 'ACCOUNT'
  isEdit: boolean = false;
  isChangePassword: boolean = false;
  isChangeUsername: boolean = false;

  // toggleSection(section: string) {
  //   this.isActive = section;
  // }
  userDetails = {
    name: 'John Doe',
    password: '********',
    fullname: 'Johnathan A. Doe',
    position: 'Software Engineer',
    username: 'johndoes1234',
    employeeId: 'EMP001234',
    email: 'johndoes@example.com',
    unit: 'Development',
    contact: '+1 234 567 8901',
    department: 'Engineering'
  }

  workSchedule = [
    { day: 'Monday', start: '09:00 AM', end: '06:00 PM', notes: 'Regular workday' },
    { day: 'Tuesday', start: '09:00 AM', end: '06:00 PM', notes: 'Regular workday' },
    { day: 'Wednesday', start: '09:00 AM', end: '06:00 PM', notes: 'Team meeting at 3 PM' },
    { day: 'Thursday', start: '09:00 AM', end: '06:00 PM', notes: 'Regular workday' },
    { day: 'Friday', start: '09:00 AM', end: '05:00 PM', notes: 'Early finish' },
    { day: 'Saturday', start: '-', end: '-', notes: 'Off' },
    { day: 'Sunday', start: '-', end: '-', notes: 'Off' },
  ];

  constructor(public layoutService: LayoutService) { }

  ngOnInit(): void {
    if (this.users) {
      this.userDetails = this.users;
      // this.userDetails = this.users;
    } 
  }

 onUpload(): void {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.previewUrl = reader.result as string;
        this.showPreview = true;
      };

      reader.readAsDataURL(file);
    }
  }

  cancelUpload(): void {
    this.previewUrl = null;
    this.showPreview = false;
    this.fileInput.nativeElement.value = ''; // Reset file input
  }

  saveUpload(): void {
    // TODO: Add logic to save the image to backend or local storage
    this.showPreview = false;
  }



}
