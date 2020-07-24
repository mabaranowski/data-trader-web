import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MarketService } from '@app/market/services/market.service';
import { DataService } from '@app/commons/services/data.service';

@Component({
    selector: 'sb-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    deviceList: any = [];
    private data: any[] = [];
    private color!: string;

    constructor(
        private marketService: MarketService,
        private dataService: DataService,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.marketService.getDevices().subscribe(res => {
            this.deviceList = res;

            this.deviceList.forEach((element: any) => {
                
                this.dataService.getDataForDevice(element._id).subscribe((data: any) => {
                    const innerTmpData: any[] = [];
                    data.forEach((element: any) => {
                        innerTmpData.push(element.payload);
                    });

                    const tmpData = [element.name];
                    tmpData.push(innerTmpData.slice(innerTmpData.length - 24, innerTmpData.length));
                    this.data.push(tmpData);
                });
            });
        });

    }

}
