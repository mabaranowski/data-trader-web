import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '@app/auth/services/user.service';
import { take, exhaustMap, map, filter } from 'rxjs/operators';
import { Metrics } from '../models/metrics.model';
import { Devices } from '../models/device.model';
import { DeviceService } from '@app/commons/services/device.service';
import { Subject } from 'rxjs';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Injectable({ providedIn: 'root' })
export class PurchaseService {

    constructor(
        private httpClient: HttpClient,
        private userService: UserService,
        private deviceService: DeviceService
    ) { }

    updatePurchasedDatasets(datasetId: string) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            return this.httpClient.patch('http://localhost:3000/api/purchase', {
                email: user.email,
                dataset: datasetId
            });
        }));
    }

    deletePurchasedDatasets(datasetId: string) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const params = new HttpParams()
            .set('email', user.email!)
            .set('dataset', datasetId);
            return this.httpClient.delete('http://localhost:3000/api/purchase', { params: params });
        }));
    }

    getPurchasedDatasets() {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const params = new HttpParams().set('email', user.email!);
            return this.httpClient.get('http://localhost:3000/api/purchase', { params: params });
        }));
    }

}