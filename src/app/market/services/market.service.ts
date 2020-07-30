import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '@app/auth/services/user.service';
import { DeviceService } from '@app/commons/services/device.service';
import { exhaustMap, map, take } from 'rxjs/operators';
import { Devices } from '../models/device.model';
import { Metrics } from '../models/metrics.model';

@Injectable({ providedIn: 'root' })
export class MarketService {

    constructor(
        private httpClient: HttpClient,
        private userService: UserService,
        private deviceService: DeviceService
    ) { }

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

    updateShareFlag(flag: boolean) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            return this.httpClient.patch('http://localhost:3000/api/metrics/share-flag', {
                email: user.email,
                isSharing: flag
            });
        }));
    }

    getShareFlag() {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            return this.httpClient.post('http://localhost:3000/api/metrics/share-flag', {
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
            return this.httpClient.get('http://localhost:3000/api/device', { params: params })
                .pipe(
                    map((val: any) => {
                        val.forEach((element: any) => {
                            this.deviceService.getDeviceInfo(element.address, element.port).subscribe(res => {
                                element.state = 'bg-success';
                            }, err => {
                                if(err.status == /^1/ || /^3/) {
                                    element.state = 'bg-warning';
                                } 
                                if(err.status == /^4/ || /^5/) {
                                    element.state = 'bg-danger';
                                } 
                                if(err.status == 0) {
                                    element.state = 'bg-secondary';
                                }
                            });
                        });
                        return val;
                    })
                );
        }));
    }

    getDeviceDetails(id: string) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const url = `http://localhost:3000/api/device/${id}`;
            return this.httpClient.get(url);
        }));
    }

    removeDevice(id: string) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const params = new HttpParams().set('id', id);
            return this.httpClient.delete('http://localhost:3000/api/device', { params: params });
        }));
    }

    getDeviceDataForIntervalPerUser(time: number) {
        this.getDevices().subscribe(list => {
            list.forEach((device: any) => {
                this.deviceService.deviceDataSubscription(time, device);
            });
        });
    }

    stopGetDeviceDataForIntervalPerUser() {
        this.deviceService.deviceDataUnsubscription();
    }

}