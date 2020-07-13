import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '@app/auth/services/user.service';

@Injectable({ providedIn: 'root' })
export class DataService {
    
    constructor(
        private httpClient: HttpClient,
        private userService: UserService
    ) { }

    saveData(_id: string, data: any) {
        return this.httpClient.post('http://localhost:3000/api/data', {
            id: _id,
            payload: data
        });
    }
    
    getDataForDevice(_id: string) {
        const params = new HttpParams().set('device', _id!);
        return this.httpClient.get('http://localhost:3000/api/data', { params: params })
    }
    
}