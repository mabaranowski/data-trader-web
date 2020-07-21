import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '@app/auth/services/user.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Metrics } from '../models/metrics.model';
import { Devices } from '../models/device.model';
import { DeviceService } from '@app/commons/services/device.service';
import { Subject } from 'rxjs';

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

}