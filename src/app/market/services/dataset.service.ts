import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class DatasetService {

    constructor(private httpClient: HttpClient) {}

    getDatasetsByType(type: string) {
        const params = new HttpParams().set('type', type);
        return this.httpClient.get(environment.API_URL + '/api/dataset', { params: params })
    }
    
    getDatasetDetails(id: string) {
        const url = `${environment.API_URL}/api/dataset/${id}`;
        return this.httpClient.get(url)
    }

    getDatasetDetailsUnwrapped(id: string) {
        const url = `${environment.API_URL}/api/dataset/${id}/unwrapped`;
        return this.httpClient.get(url)
    }

    getDatasetDetailsUnwrappedMetadata(id: string) {
        const url = `${environment.API_URL}/api/dataset/${id}/unwrapped/metadata`;
        return this.httpClient.get(url)
    }

}
