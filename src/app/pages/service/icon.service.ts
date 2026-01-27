import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IconService {
    constructor(private http: HttpClient) {}

    icons!: any[];

    selectedIcon: any;

    apiUrl = 'assets/demo/data/icons.json';

    getIcons() {
        return this.http.get(this.apiUrl).pipe(
            map((response: any) => {
                this.icons = response.icons;
                return this.icons;
            })
        );
    }

    getWeatherIcon(condition: string): string {
        const normalized = (condition || '').toLowerCase();
        if (normalized.includes('sun')) return 'assets/icons/Sunny.png';
        if (normalized.includes('rain')) return 'assets/icons/Rain.png';
        if (normalized.includes('cloud')) return 'assets/icons/Cloudy.png';
        if (normalized.includes('storm') || normalized.includes('thunder')) return 'assets/icons/Rain.png';
        return 'assets/icons/Cloudy.png';
    }
}
