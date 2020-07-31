import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '@app/auth/services/user.service';
import { exhaustMap, take } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class PurchaseService {

    constructor(
        private httpClient: HttpClient,
        private userService: UserService
    ) { }

    updatePurchasedDatasets(datasetId: string) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            return this.httpClient.patch(environment.API_URL + '/api/purchase', {
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
            return this.httpClient.delete(environment.API_URL + '/api/purchase', { params: params });
        }));
    }

    getPurchasedDatasets() {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const params = new HttpParams().set('email', user.email!);
            return this.httpClient.get(environment.API_URL + '/api/purchase', { params: params });
        }));
    }

}