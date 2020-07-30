import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class DeviceService {
    private dataSubscription: Subscription[] = [];
    
    constructor(
        private httpClient: HttpClient,
        private dataService: DataService
    ) { }

    getDeviceInfo(address: string, port: number) {
        const destination = `http://${address}:${port}/api/about`;
        return this.httpClient.get(destination);
    }

    getDeviceData(address: string, port: number) {
        const destination = `http://${address}:${port}/api`
        return this.httpClient.get(destination);
    }

    getDeviceDataForInterval(time: number, address: string, port: number) {
        return interval(time).pipe(flatMap(() => this.getDeviceData(address, port)));
    }

    deviceDataSubscription(time: number, device: any) {
        this.dataSubscription.push(this.getDeviceDataForInterval(time, device.address, device.port)
        .subscribe(
            data => {
                this.dataService.saveData(device._id, data).subscribe();
            }, err => {}));
    }

    deviceDataUnsubscription() {
        this.dataSubscription.forEach(element => {
           element.unsubscribe(); 
        });
        this.dataSubscription = [];
    }

}