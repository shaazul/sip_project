import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments.development';

@Injectable({ providedIn: 'root' })
export class GeneralService {
    private readonly base = environment.apiEndPoint + environment.api_base;

    constructor(private http: HttpClient) {}

    getAnnouncement(): Observable<any> {
        return this.http.get(`${this.base}/announcement`);
    }

    getWeather(): Observable<any> {
        return this.http.get(`${this.base}/weather`);
    }

    getUserDetail(): Observable<any> {
        return this.http.get(`${this.base}/user/detail`);
    }

    updateUserPreference(payload: any): Observable<any> {
        return this.http.post(`${this.base}/user/preference`, payload);
    }
}


