import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class DataService {
    
    constructor(
        private httpClient: HttpClient
    ) { }

    saveData(_id: string, data: any) {
        return this.httpClient.post(environment.API_URL + '/api/data', {
            id: _id,
            payload: data
        });
    }
    
    getDataForDevice(_id: string) {
        const params = new HttpParams().set('device', _id!);
        return this.httpClient.get(environment.API_URL + '/api/data', { params: params })
    }
    
}