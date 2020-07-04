import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MarketService } from '@app/market/services/market.service';
import { Devices } from '@app/market/models/device.model';

@Component({
  selector: 'sb-share',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  removeState: boolean = false;
  showPopup: boolean = false;
  deviceList!: any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private marketService: MarketService
  ) { }

  ngOnInit(): void {
    this.fetchDevices();
  }

  onAdd() {
    this.showPopup = !this.showPopup;
    this.removeState = false;
  }

  onRemove() {
    this.removeState = !this.removeState;
  }

  onCloseEvent() {
    this.onAdd();
    this.fetchDevices();
  }

  private fetchDevices() {
    this.marketService.getDevices().subscribe(res => {
      this.deviceList = res;
      this.changeDetectorRef.markForCheck();
    });
  }

}
