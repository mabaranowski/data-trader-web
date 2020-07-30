import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/commons/services/data.service';
import { DatasetService } from '@app/market/services/dataset.service';
import { MarketService } from '@app/market/services/market.service';
import { PurchaseService } from '@app/market/services/purchase.service';

@Component({
    selector: 'sb-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    deviceList: any = [];
    subStreamData: any = [];
    private data: any[] = [];
    private color!: any;

    constructor(
        private marketService: MarketService,
        private dataService: DataService,
        private datasetService: DatasetService,
        private purchaseService: PurchaseService
    ) { }

    ngOnInit() {
        this.color = this.randomColor();
        
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

        this.purchaseService.getPurchasedDatasets().subscribe((res: any) => {
            const streamList = res.filter((stream: any) => {
              return stream.dataset.internalType === 'stream'
            });
      
            streamList.forEach((element: any) => {
                this.datasetService.getDatasetDetailsUnwrapped(element.dataset._id).subscribe((res: any) => {
                    const innerTmpData: any[] = [];
                    res.forEach((element: any) => {
                        innerTmpData.push(element.data);
                    });
                    
                    const tmpData = [element.dataset.description];
                    tmpData.push(innerTmpData.slice(innerTmpData.length - 24, innerTmpData.length));
                    this.subStreamData.push(tmpData);
                });
            });
          });
    }

    private randomColor() {
        const random = Math.random() * 3 + 1;
        if(random < 1) {
            return 'yellow';
        }
        if(random >= 1 && random < 2) {
            return 'red';
        }
        if(random >= 2 && random < 3) {
            return 'blue';
        }
        if(random >= 3) {
            return 'green';
        }
    }

}
