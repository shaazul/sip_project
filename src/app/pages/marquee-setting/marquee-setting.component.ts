import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';

import { HttpService } from '../service/http.service';
import { environment } from '../../../environments/environments.development';

import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { TextareaModule } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DatePickerModule } from 'primeng/datepicker';

import moment from 'moment-timezone';
@Component({
    selector: 'app-marquee-setting',
    standalone: true,
    imports: [CommonModule, FormsModule, InputTextModule, DatePickerModule, SelectModule, TableModule, ButtonModule, CheckboxModule, DialogModule, TextareaModule, RadioButtonModule, ConfirmDialogModule],
    templateUrl: './marquee-setting.component.html',
    styleUrls: ['./marquee-setting.component.scss'],
    providers: [ConfirmationService]
})
export class MarqueeSettingComponent implements OnInit {
    marqueeList: any[] = [];

    selectedMarquees: any[] = [];

    marquee: any = {
        fileNo: '',
        fileName: '',
        date: '',
        dateCreated: '',
        displayText: '',
        status: '',
        startTime: '',
        endTime: '',
        startDate: '',
        endDate: '',
        frequency: '',
        day: '',
        selectedDay: ''
    };

    daysOfWeek: { name: string; selected: string | false }[] = [
        { name: 'Monday', selected: false },
        { name: 'Tuesday', selected: false },
        { name: 'Wednesday', selected: false },
        { name: 'Thursday', selected: false },
        { name: 'Friday', selected: false },
        { name: 'Saturday', selected: false },
        { name: 'Sunday', selected: false }
    ];

    isNew: any = true;
    isVisibleMarquee: any = false;

    submitted = false;

    optionsFrequency: any = [
        {
            name: 'Daily',
            value: 'daily'
        },
        {
            name: 'Weekly',
            value: 'weekly'
        },
        {
            name: 'Yearly',
            value: 'yearly'
        },
        {
            name: 'Once',
            value: 'once'
        }
    ];

    optionsStatus: any = [
        {
            name: 'Suspended',
            value: 'Suspended'
        },
        {
            name: 'Waiting',
            value: 'Waiting'
        }
    ];

    clearSelection() {
        this.selectedMarquees = [];
    }

    constructor(
        private httpService: HttpService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.apiGetMarquee();
    }

    getSelectedDays(): string {
        return this.daysOfWeek
            .filter((day) => day.selected)
            .map((day) => day.name.toLowerCase())
            .join(',');
    }

    addNew() {
        this.submitted = false;

        this.marquee = {
            fileNo: '',
            fileName: '',
            date: '',
            dateCreated: '',
            displayText: '',
            status: '',
            startTime: '',
            endTime: '',
            startDate: '',
            endDate: '',
            frequency: '',
            days: []
        };

        this.daysOfWeek.forEach((day) => (day.selected = false));

        this.isNew = true;
        this.isVisibleMarquee = true;
    }

    cancelDialog() {
        this.isVisibleMarquee = false;
    }

    onFrequencyChange() {
        if (this.marquee.frequency !== 'weekly') {
            this.marquee.selectedDay = null;
        }
    }

    formInvalid() {
        return !this.marquee.displayText || !this.marquee.fileName;
    }

    openEditDialog(item: any) {
        this.marquee = {
            ...item,
            selectedDay: item.day
        };

        this.isNew = false;

        if (item.date && item.date.toLowerCase() !== 'depends') {
            const parsedDate = this.convertToDateInputFormat(item.date);
            this.marquee.startDate = parsedDate;
            this.marquee.endDate = parsedDate;
        }

        // this.daysOfWeek.forEach(day => {
        //     day.selected = this.marquee.day
        //         ?.toLowerCase()
        //         .split(',')
        //         .includes(day.name.toLowerCase())
        //         ? day.name
        //         : false;
        // });

        this.isVisibleMarquee = true;
    }

    convertToDateInputFormat(dateStr: string): string {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            const day = parts[0].padStart(2, '0');
            const month = parts[1].padStart(2, '0');
            const year = parts[2];
            return `${year}-${month}-${day}`;
        }
        return '';
    }

    apiGetMarquee() {
        const url = `${environment.apiEndPoint}${environment.api_base}/marquees`;
        this.httpService.getData(url).subscribe({
            next: (response: any) => {
                const data = response.marquees;

                const dateData = data.map((item: any) => {
                    const [startDate, startTimeFull] = item.start_at ? item.start_at.split(' ') : ['', ''];
                    const [endDate, endTimeFull] = item.end_at ? item.end_at.split(' ') : ['', ''];

                    const startTime = startTimeFull ? startTimeFull.substring(0, 5) : '';
                    const endTime = endTimeFull ? endTimeFull.substring(0, 5) : '';

                    return {
                        fileName: item.name,
                        displayText: item.message,
                        startAt: item.start_at,
                        endAt: item.end_at,
                        startDate,
                        startTime,
                        endDate,
                        endTime,
                        frequency: item.frequency,
                        day: item.weekly_day,
                        status: item.status,
                        dateCreated: item.created_at,
                        id: item.id,
                        fileNo: item.id.toString().padStart(4, '0')
                    };
                });

                this.marqueeList = dateData;
            },
            error: (err) => {
                console.error('Error fetching marquees:', err);
            }
        });
    }

    apiCreateMarquee() {
        this.submitted = true;
        if (!this.marquee.displayText || !this.marquee.fileName) {
            return;
        }

        const url = `${environment.apiEndPoint}${environment.api_base}/marquees`;

        const startAt = this.combineDateTime(this.changeDate(this.marquee.startDate), this.changeTime(this.marquee.startTime));
        const endAt = this.combineDateTime(this.changeDate(this.marquee.endDate), this.changeTime(this.marquee.endTime));

        const payload = {
            name: this.marquee.fileName,
            message: this.marquee.displayText,
            start_date: this.changeDate(this.marquee.startDate) || null,
            end_date: this.changeDate(this.marquee.endDate) || null,
            start_at: startAt || null,
            end_at: endAt || null,
            frequency: this.marquee.frequency || null,
            weekly_day: this.marquee.frequency === 'weekly' ? this.marquee.selectedDay : null,
            status: this.marquee.status === '' ? null : this.marquee.status
        };
        if (this.marquee.frequency !== 'weekly') {
            delete payload.weekly_day;
        }

        this.httpService.postData(url, payload).subscribe({
            next: (response: any) => {
                this.apiGetMarquee();
                this.cancelDialog();
            },
            error: (err) => {
                console.error('Error creating marquee:', err);
            }
        });
    }

    apiUpdateMarquee() {
        this.marquee.days = this.daysOfWeek.filter((d) => d.selected).map((d) => d.name);

        const url = `${environment.apiEndPoint}${environment.api_base}/marquees/${this.marquee.id}`;

        const startAt = this.combineDateTime(this.changeDate(this.marquee.startDate), this.changeTime(this.marquee.startTime));
        const endAt = this.combineDateTime(this.changeDate(this.marquee.endDate), this.changeTime(this.marquee.endTime));

        const payload: any = {
            name: this.marquee.fileName,
            message: this.marquee.displayText,
            start_at: startAt,
            end_at: endAt,
            frequency: this.marquee.frequency,
            weekly_day: this.marquee.frequency === 'weekly' ? this.marquee.selectedDay : null,
            status: this.marquee.status
        };

        if (this.marquee.frequency !== 'weekly') {
            delete payload.weekly_day;
        }

        this.httpService.putData(url, payload).subscribe({
            next: (response: any) => {
                this.apiGetMarquee();
                this.cancelDialog();
            },
            error: (err) => {
                console.error('Error updating marquee:', err);
            }
        });
    }

    apiDeleteItem(item: any) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete "${item.fileName}"?`,
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Delete',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger'
            },
            accept: () => {
                const url = `${environment.apiEndPoint}${environment.api_base}/marquees/${item.id}`;
                this.httpService.deleteData(url).subscribe({
                    next: () => {
                        this.apiGetMarquee();
                    },
                    error: (err) => console.error('Error deleting marquee:', err)
                });
            },
            reject: () => {
            }
        });
    }

    changeDate(timezone: any) {
        const newDate = moment.utc(timezone).tz('Asia/Kuala_Lumpur').format('YYYY-MM-DD');
        return newDate;
    }

    changeTime(timezone: any) {
        const newTime = moment.utc(timezone).tz('Asia/Kuala_Lumpur').format('HH:MM:00');
        return newTime;
    }

    combineDateTime(dateStr: string, timeStr: string): string {
        if (!dateStr) return '';
        if (!timeStr) timeStr = '00:00:00';

        return `${dateStr} ${timeStr}`;
        // const date = new Date(`${dateStr}T${timeStr}`);
        // const yyyy = date.getFullYear();
        // const mm = (date.getMonth() + 1).toString().padStart(2, '0');
        // const dd = date.getDate().toString().padStart(2, '0');
        // const hh = date.getHours().toString().padStart(2, '0');
        // const min = date.getMinutes().toString().padStart(2, '0');
        // const ss = '00';
        // return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
    }
}
