import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketService } from '@app/market/services/market.service';
import { Devices } from '@app/market/models/device.model';

@Component({
  selector: 'sb-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {
  private device!: Devices;
  private isActive: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private marketService: MarketService
  ) { }

  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.marketService.getDeviceDetails(id).subscribe(res => {
      this.device = res;
    });
  }

}
