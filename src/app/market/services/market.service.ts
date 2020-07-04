import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '@app/auth/services/user.service';
import { take, exhaustMap } from 'rxjs/operators';
import { Metrics } from '../models/metrics.model';
import { Devices } from '../models/device.model';

@Injectable({ providedIn: 'root' })
export class MarketService {

    constructor(
        private httpClient: HttpClient,
        private userService: UserService
    ) {}

    updateMetrics(form: Metrics) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            return this.httpClient.patch('http://localhost:3000/api/metrics', {
                email: user.email,
                form: form
            });
        }));
    }

    getMetrics() {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            return this.httpClient.post('http://localhost:3000/api/metrics', {
                email: user.email
            });
        }));
    }

    addDevice(form: Devices) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            return this.httpClient.post('http://localhost:3000/api/device', {
                email: user.email,
                form: form
            });
        }));
    }
    
    getDevices() {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const params = new HttpParams().set('email', user.email!);
            return this.httpClient.get('http://localhost:3000/api/device', { params: params });
        }));
    }

    removeDevice(id: string) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const params = new HttpParams().set('id', id);
            return this.httpClient.delete('http://localhost:3000/api/device', { params: params });
        }));
    }



    
}