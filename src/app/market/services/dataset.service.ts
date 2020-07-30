import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DatasetService {

    constructor(private httpClient: HttpClient) {}

    getDatasetsByType(type: string) {
        const params = new HttpParams().set('type', type);
        return this.httpClient.get('http://localhost:3000/api/dataset', { params: params })
    }
    
    getDatasetDetails(id: string) {
        const url = `http://localhost:3000/api/dataset/${id}`;
        return this.httpClient.get(url)
    }

    getDatasetDetailsUnwrapped(id: string) {
        const url = `http://localhost:3000/api/dataset/${id}/unwrapped`;
        return this.httpClient.get(url)
    }

    getDatasetDetailsUnwrappedMetadata(id: string) {
        const url = `http://localhost:3000/api/dataset/${id}/unwrapped/metadata`;
        return this.httpClient.get(url)
    }

}
