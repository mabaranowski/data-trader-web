import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { DataService } from './data.service';
import { parseString } from 'xml2js';

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
        const destination = `http://${address}`;
        return this.httpClient.get(destination);
    }

    getDeviceData(address: string, port: number) {
        const destination = `http://${address}:${port}/api`
        return this.httpClient.get(destination);
    }

    getDeviceDataByResourceNotJson(address: string) {
        const destination = `http://${address}`;
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
                    const marker = this.filterPayloadByTag(device.tag, data);
                    this.dataService.saveData(device._id, marker).subscribe();
                }, err => {
                    this.dataSubscription.push(this.getDeviceDataForIntervalNotJson(time, device.address)
                        .subscribe(
                            (data: any) => {
                                let payload: any = {};
                                parseString(data, function (err, result) {
                                    if(!!result) {
                                        Object.entries(result.root).forEach(el => {
                                            const name = el[0];
                                            const valueArray: any = el[1];
                                            const value = valueArray[0];
                                            payload[name] = value;
                                        });
                                    } else {
                                        payload = data;
                                    }
                                });
                                const marker = this.filterPayloadByTag(device.tag, payload);
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

    private filterPayloadByTag(tag: any, payload: any) {
        let marker;
        if (!!tag) {
            marker = payload[tag];
            if (marker == undefined) {
                marker = payload;
            }
        } else {
            marker = payload;
        }
        return marker;
    }
}