import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, of, Subscription } from 'rxjs';
import { flatMap, take, exhaustMap } from 'rxjs/operators';
import { UserService } from '@app/auth/services/user.service';
import { MarketService } from '@app/market/services/market.service';

@Injectable({ providedIn: 'root' })
export class DeviceService {
    private dataSubscription: Subscription[] = [];
    
    constructor(
        private httpClient: HttpClient
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

    deviceDataSubscription(time: number, address: string, port: number) {
        this.dataSubscription.push(this.getDeviceDataForInterval(time, address, port)
        .subscribe(
            data => {
                console.log(data)
            },
            err => {
                
            }));
    }

    deviceDataUnsubscription() {
        this.dataSubscription.forEach(element => {
           element.unsubscribe(); 
        });
        this.dataSubscription = [];
    }

}