import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PermissionsService {
    private permissions: string[] = [];

    constructor() {
        const user: any = localStorage.getItem('userData');
        const userData = JSON.parse(user);
        // console.log(userData);
        
        //auth check get userData
        if (userData === undefined || userData === null) {
            this.permissions = [];
        } else {
            this.permissions = userData.permissions.map((x: any) => x.name);
        }
    }

    hasPermission(permission: string): boolean {
        return this.permissions.includes(permission);
    }
}
