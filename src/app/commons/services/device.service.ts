import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import { DataService } from './data.service';
import { parseString } from 'xml2js';
import { isArray } from 'util';
import { environment } from 'environments/environment';
const _ = require('lodash');

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

    getDeviceDataByResource(address: string) {
        // const destination = `http://${address}`;
        const destination = `${environment.PROXY}${address}`;
        return this.httpClient.get(destination);
    }

    getDeviceData(address: string, port: number) {
        const destination = `http://${address}:${port}/api`
        return this.httpClient.get(destination);
    }

    getDeviceDataByResourceNotJson(address: string) {
        // const destination = `http://${address}`;
        const destination = `${environment.PROXY}${address}`;
        return this.httpClient.get(destination, { responseType: 'text' });
    }

    getDeviceDataForInterval(time: number, address: string) {
        return interval(time).pipe(flatMap(() => this.getDeviceDataByResource(address)));
    }

    getDeviceDataForIntervalNotJson(time: number, address: string) {
        return interval(time).pipe(flatMap(() => this.getDeviceDataByResourceNotJson(address)));
    }

    deviceDataSubscription(time: number, device: any) {
        this.dataSubscription.push(this.getDeviceDataForInterval(time, device.address)
            .subscribe(
                (data: any) => {
                    let marker = data;
                    if(device.tag != '' && device.tag != undefined) {
                        marker = this.customFind(data, device.tag);
                    }
                    console.log(marker);
                    this.dataService.saveData(device._id, marker).subscribe();
                }, err => {
                    this.dataSubscription.push(this.getDeviceDataForIntervalNotJson(time, device.address)
                        .subscribe(
                            (data: any) => {
                                let payload: any = {};
                                parseString(data, function (err, result) {
                                    if(!!result) {
                                        payload = result;
                                    } else {
                                        payload = data;
                                    }
                                });
                                let marker = payload;
                                if(device.tag != '' && device.tag != undefined) {
                                    marker = this.customFind(payload, device.tag);
                                    if(isArray(marker) && marker.length == 1) {
                                        marker = marker[0];
                                    }
                                }
                                console.log(marker);
                                this.dataService.saveData(device._id, marker).subscribe();
                            }));
                }));
    }

    deviceDataUnsubscription() {
        this.dataSubscription.forEach(element => {
            element.unsubscribe();
        });
        this.dataSubscription = [];
    }

    customFind = (obj: any, key: any) => {
        if (_.has(obj, key))
            return obj[key];
        
        return _.flatten(_.map(obj, (v: any) => {
            return typeof v == "object" ? this.customFind(v, key) : [];
        }), true);
    }

}