import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-dashboard-a',
  standalone: true,
  imports: [CommonModule, ChartModule, KnobModule, FormsModule, ScrollPanelModule, ButtonModule, TableModule],
  templateUrl: './dashboard-a.component.html',
  styleUrl: './dashboard-a.component.scss'
})
export class DashboardAComponent {

  isDark = false;
  chartOptions: any;

  progress: number = 32.79;

  lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      { label: 'Service Request', data: [50, 25, 12, 48, 56, 76, 42], borderColor: '#f97316', backgroundColor: 'transparent', tension: 0.4, pointRadius: 4 },
      { label: 'API Response Efficiency', data: [20, 83, 23, 74, 36, 64, 33], borderColor: '#15803d', backgroundColor: 'transparent', tension: 0.4, pointRadius: 4 },
      { label: 'System Performance', data: [41, 52, 24, 73, 23, 21, 32], borderColor: '#0ea5e9', backgroundColor: 'transparent', tension: 0.4, pointRadius: 4 }
    ]
  };

  lineOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true } }
  };

  updates = [
    { title: 'New Telemedicine System', description: 'Integrated telemedicine platform improves remote patient consultations by 30%.', date: 'February 20, 2026' },
    { title: 'Electronic Health Record (EHR) Upgrade', description: 'Increased EHR capacity by 500TB, reducing data retrieval latency for patient records.', date: 'March 5, 2025' },
    { title: 'System Security Patch', description: 'Applied critical security updates to enhance system protection against unauthorized access.', date: 'April 12, 2025' },
    { title: 'Performance Optimization', description: 'Backend optimizations reduced average API response time by 25%.', date: 'May 18, 2025' },
    { title: 'User Interface Refresh', description: 'Improved dashboard layout and readability for better user experience.', date: 'June 2, 2025' },
    { title: 'Data Backup Automation', description: 'Implemented automated nightly backups to ensure data reliability and recovery.', date: 'July 10, 2025' },
    { title: 'Role-Based Access Control', description: 'Added granular user roles to improve access management and system security.', date: 'August 1, 2025' }
  ];

  alarms = [
    { name: 'High CPU Usage', type: 'Equipment', occurred: '2025-08-20 09:12' },
    { name: 'Database Connection Lost', type: 'Equipment', occurred: '2025-08-20 08:45' },
    { name: 'Memory Threshold Exceeded', type: 'Equipment', occurred: '2025-08-19 22:30' },
    { name: 'Backup Completed', type: 'Equipment', occurred: '2025-08-19 02:10' },
    { name: 'Unauthorized Login Attempt', type: 'Equipment', occurred: '2025-08-18 19:54' },
    { name: 'Service Restarted', type: 'Equipment', occurred: '2025-08-18 11:20' },
    { name: 'Disk Space Low', type: 'Equipment', occurred: '2025-08-17 16:05' },
    { name: 'Backup Completed', type: 'Equipment', occurred: '2025-08-19 02:10' },
    { name: 'Unauthorized Login Attempt', type: 'Equipment', occurred: '2025-08-18 19:54' },
    { name: 'Service Restarted', type: 'Equipment', occurred: '2025-08-18 11:20' },
    { name: 'Disk Space Low', type: 'Equipment', occurred: '2025-08-17 16:05' }
  ];

  notifications = [
    { code: 'SEC', country: 'Security & Access Control', value: 95, change: 3, trend: 'up', status: 'LOW' },
    { code: 'AUT', country: 'Workflow Automation', value: 79, change: 5, trend: 'up', status: 'LOW' },
    { code: 'OPS', country: 'Operational Monitoring', value: 71, change: 12, trend: 'down', status: 'HIGH' },
    { code: 'INT', country: 'System Integrations', value: 68, change: 9, trend: 'down', status: 'HIGH' },
  ];

  skills = [
    { name: 'Security Controls', value: 95 },
    { name: 'Data Governance', value: 90 },
    { name: 'Audit Readiness', value: 86 },
    { name: 'Access Management', value: 92 },
    { name: 'System Monitoring', value: 88 }
  ];

  sparklineData = {
    labels: ['', '', '', '', '', '', ''],
    datasets: [
      {
        data: [72, 75, 78, 80, 85, 88, 92],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        fill: true,
        tension: 0.4,
        pointRadius: 0
      }
    ]
  };

  sparklineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } }
  };

  donutData = {
    labels: ['Healthy', 'Remaining'],
    datasets: [
      { data: [66, 34], backgroundColor: ['#10b981', '#e4e4e4'], borderWidth: 0 }
    ]
  };

  donutOptions = { cutout: '70%', plugins: { legend: { display: false } } };

  productivity: number = 60;
  systemFunctionalities: number = 92;

  options = {
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true } }
  };

  ngOnInit() {
    this.isDark = this.checkDarkMode();
    this.chartOptions = this.buildChartOptions(this.isDark);
  }

  checkDarkMode(): boolean {
    return document.body.classList.contains('dark') ||
      document.body.classList.contains('p-dark');
  }

  buildChartOptions(isDark: boolean) {
    const gridColor = isDark ? '#c0c0c0' : '#858585';

    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { color: gridColor },
        },
        y: {
          grid: { color: gridColor },
        }
      }
    };
  }



}
