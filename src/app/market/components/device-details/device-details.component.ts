import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketService } from '@app/market/services/market.service';
import { Devices } from '@app/market/models/device.model';
import { DeviceService } from '@app/commons/services/device.service';
import { DataService } from '@app/commons/services/data.service';
import { DEVICE_TYPE, DEVICE_LOCATION } from '@app/market/data/device-const';
import { translateDeviceTypeLocation } from '@app/commons/utils/dataset.util';

@Component({
  selector: 'sb-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {
  private device!: Devices;
  private isActive: boolean = false;
  private data!: any[];
  private color!: string;

  constructor(
    private route: ActivatedRoute,
    private marketService: MarketService,
    private deviceService: DeviceService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.marketService.getDeviceDetails(id).subscribe((res: any) => {
      this.device = res;
      res = translateDeviceTypeLocation(res);
      
      this.deviceService.getDeviceInfo(res.address, res.port).subscribe((dev: any) => {
        this.isActive = true;
        
        const tmpData: any[] = []
        this.dataService.getDataForDevice(id).subscribe((data: any) => {

          data.forEach((element: any) => {
            tmpData.push(element.payload);
          });
          this.data = tmpData;
        });
      }, err => {
        this.isActive = false;
      });
    });

  }

}
