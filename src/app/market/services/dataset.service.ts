import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Dataset } from '../models/dataset.model';
import { DATASETS } from '../data/datasets';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DatasetService {

    constructor(private httpClient: HttpClient) {}

    getDatasetsByType(type: string) {
        const params = new HttpParams().set('type', type);
        return this.httpClient.get('http://localhost:3000/api/dataset', { params: params })
    }
    
}
